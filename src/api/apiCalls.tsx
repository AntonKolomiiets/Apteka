const cheerio = require('react-native-cheerio');

interface Product {
  id: number;
  name: string;
  price: number;
  store: string;
  picture: string;
}

export const searchAnc = async (
  prompt: string,
  signal: AbortSignal,
): Promise<Product[]> => {
  const payload = {
    query: `${prompt}`,
    source: 5,
    city: 5,
  };

  const api = `https://anc.ua/productbrowser/v3/ua/search/query`;

  try {
    const initialResponse = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: signal,
    });

    if (!initialResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const initialResult = await initialResponse.json();
    const totalItems = initialResult.products.total;
    const pageSize = initialResult.products.page_size;
    const totalPages = Math.ceil(totalItems / pageSize);
    let allItems: Product[] = [];
    const itemIds = new Set<number>();

    const addItems = (items: any[]) => {
      items.forEach(item => {
        const id = parseInt(item.id, 10);
        if (!itemIds.has(id) && item.name && item.price !== undefined) {
          itemIds.add(id);
          allItems.push({
            id,
            name: item.name,
            price: item.price ? parseFloat(item.price) : 0,
            store: 'anc',
            picture: `${item.picture}.webp`,
          });
        }
      });
    };

    addItems(initialResult.products.items);

    for (let page = 1; page < totalPages; page++) {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...payload, page}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      addItems(result.products.items);
    }

    return allItems;
  } catch (error) {
    console.log('Error fetching data in "searchAnc()":', '\x1b[31m', error);
    return [];
  }
};

export const searchPodorozhnyk = async (
  prompt: string,
  signal: AbortSignal,
): Promise<Product[]> => {
  const url = `https://catalogue.l.podorozhnyk.com/api/v2/projections/search?query=${prompt}`;
  try {
    const response = await fetch(url, {signal});
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();

    // console.log(result);

    const drugs = result.searchItems.map((item: any) => ({
      id:
        item.id && !isNaN(item.id)
          ? parseInt(item.id, 10)
          : Date.now() + Math.random(),
      name: item.name || 'Name not found',
      price: item.price?.current ? parseFloat(item.price.current) : 0,
      picture: item.preview?.src?.medium || '',
      store: 'podorozhnyk',
    }));

    return drugs.filter(
      (drug: Product) => drug.id && drug.name && drug.price !== undefined,
    );
  } catch (error) {
    console.log(
      'Error fetching data in "searchPodorozhnyk()":',
      '\x1b[31m',
      error,
    );
    return [];
  }
};

export const searchApteka911 = async (
  prompt: string,
  signal: AbortSignal,
): Promise<Product[]> => {
  const url = `https://apteka911.ua/ua/shop/search?query=${prompt}`;
  try {
    const response = await fetch(url, {signal});
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const html = await response.text();
    const $ = cheerio.load(html); // Load the HTML into cheerio

    const products = $('.block-prod-full')
      .map((i: any, element: any) => {
        const productBlock = $(element);
        const name = productBlock.find('.prod__header a').text().trim();
        const priceText = productBlock.find('.price-new').text().trim();
        const price =
          parseFloat(priceText.replace(' грн.', '').replace(',', '.')) || 0;
        const picture =
          productBlock
            .find('.b-prod__thumb meta[itemprop="contentUrl"]')
            .attr('content') || '';
        const productUrl = productBlock.find('.prod__header a').attr('href');
        const idMatch = productUrl ? productUrl.match(/-p(\d+)/) : null;
        const id = idMatch
          ? parseInt(idMatch[1], 10)
          : Date.now() + Math.random();

        return {id, name, price, picture, store: '911'};
      })
      .get()
      .filter(
        (product: Product) =>
          product.id && product.name && product.price !== undefined,
      ); // Filter out invalid items

    return products;
  } catch (error) {
    console.log(
      'Error fetching data in "searchApteka911()":',
      '\x1b[31m',
      error,
    );
    return [];
  }
};

// const pullItem = ({id, name, price, picture, store: '911'}: Product) => {
//   let arrayOfObjects: Product[] = []
//   return arrayOfObjects
// }
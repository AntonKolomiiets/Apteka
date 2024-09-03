// import axion
// function call api anc.ua , format responce, return object with name and price
//



// export const searchAnc = async (text: string) => {
//     const payload = {
//       query: `${text}`,
//       source: 5,
//       city: 5,
//     };

//     const api = `https://anc.ua/productbrowser/v3/ua/search/query`;

//     try {
//       const initialResponse = await fetch(api, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!initialResponse.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const initialResult = await initialResponse.json();
//       const totalItems = initialResult.products.total;
//       const pageSize = initialResult.products.page_size;
//       const totalPages = Math.ceil(totalItems / pageSize);
//       // console.log(result);
//       let allDrugs = initialResult.products.items.map((item: any) => ({
//         id: parseInt(item.id, 10),
//         name: item.name,
//         price: item.price? parseFloat(item.price) : 0,
//         store: 'anc',
//       }));

//       for (let page = 1; page < totalPages; page++) {
//         const response = await fetch(api, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ ...payload, page }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const result = await response.json();
//         const items = result.products.items.map((item: any) => ({
//           id: parseInt(item.id, 10),
//           name: item.name,
//           price: item.price ? parseFloat(item.price) : 0,
//           store: 'anc',
//         }));
//         allDrugs = [... allDrugs, ...items];
//       }

//       return allDrugs
//     } catch (error) {
//       // console.error('Error fetching data:', error);
//     }
//   };


/** HTML TO PARSE!! */


// For apteka911 we need to make get request to https://apteka911.ua/ua/shop/search?query=%D1%96%D0%B1%D1%83
// which will return html
// need to parse htm and retreeve data of "Товарів: 31"
// and 31 to match:
// <div class="block-prod-full extra-small" v-analytics-product="{'listName': 'search', 'product': products[0]}">
//     <div class="prod__left">
//     <div class="b-prod__thumb" itemscope itemtype='https://schema.org/ImageObject'>
//         <meta itemprop="contentUrl" content="https://apteka911.ua/content/shop/products/238855/ibuprofen-darnitsa-tabl-200mg-20-darnitsa-chao-farm-firma-big-800x800-2b91.jpg">
//         <meta itemprop="name" content="Ібупрофен-Дарниця табл. 200мг №20">
//         <c-wish-item item-data="{{products[0]}}"></c-wish-item>
//         <a href="https://apteka911.ua/ua/shop/ibuprofen-darnitsya-tabl-200mg-20-p238855" v-ga-click="products[0]">
//             <img src="https://apteka911.ua/content/shop/products/238855/ibuprofen-darnitsa-tabl-200mg-20-darnitsa-chao-farm-firma-cart-120x120-181f.jpg" width="120" height="120" alt="Ібупрофен-Дарниця табл. 200мг №20" title="Купити Ібупрофен-Дарниця табл. 200мг №20">
//         </a>
//     </div>
// </div>
// <div class="prod__right">
//     <div>
//         <p class="prod__header"><a href="https://apteka911.ua/ua/shop/ibuprofen-darnitsya-tabl-200mg-20-p238855" v-ga-click="products[0]">Ібупрофен-Дарниця табл. 200мг №20</a></p>
//         <p class="maker">Виробник: Дарниця</p>
//         <p class="maker">Країна: Україна</p>
//         <p class="maker">Бренд: <span class="g-uppercase">ІБУПРОФЕН</span></p>
//     </div>

// <div class="b-prod__option clearfix">
//     <div class="b-prod__price big">
//             <div class="price-new">48.50 <small>грн.</small></div>
//     </div>
//     <c-buy-item item-data="{{products[0]}}" btn-size="btn-s"></c-buy-item>
//         <a href="https://apteka911.ua/ua/shop/ibuprofen-p238855/kiev" class="btn btn-outline-secondary btn-s" title="Наявність Ібупрофен-Дарниця табл. 200мг №20 в аптеках" v-ga-click="products[0]" v-ga-data-layer-click="{ d: products[0], event: 'avail_in_pharm' }"><i class="icon-your-pharmacy"></i>Де є</a>
// </div>
// </div>
// </div>

// <div class="block-prod-full extra-small" v-analytics-product="{'listName': 'search', 'product': products[1]}">
// <div class="prod__left">
//     <div class="b-prod__thumb" itemscope itemtype='https://schema.org/ImageObject'>
//         <meta itemprop="contentUrl" content="https://apteka911.ua/content/shop/products/33514/ibuprofen-darnitsa-tabl-200mg-50-darnitsa-chao-farm-firma-big-800x800-dad2.jpg">
//         <meta itemprop="name" content="Ібупрофен-Дарниця табл. 200мг №50">
//         <c-wish-item item-data="{{products[1]}}"></c-wish-item>
//         <a href="https://apteka911.ua/ua/shop/ibuprofen-darnitsya-tabl-200mg-50-p33514" v-ga-click="products[1]">
//             <img src="https://apteka911.ua/content/shop/products/33514/ibuprofen-darnitsa-tabl-200mg-50-darnitsa-chao-farm-firma-cart-120x120-5f74.jpg" width="120" height="120" alt="Ібупрофен-Дарниця табл. 200мг №50" title="Купити Ібупрофен-Дарниця табл. 200мг №50">
//         </a>
//     </div>
// </div>
// <div class="prod__right">
//     <div>
//         <p class="prod__header"><a href="https://apteka911.ua/ua/shop/ibuprofen-darnitsya-tabl-200mg-50-p33514" v-ga-click="products[1]">Ібупрофен-Дарниця табл. 200мг №50</a></p>
//         <p class="maker">Виробник: Дарниця</p>
//         <p class="maker">Країна: Україна</p>
//         <p class="maker">Бренд: <span class="g-uppercase">ІБУПРОФЕН</span></p>
//         <div class="b-prod__rating mt20">
//             <a href="https://apteka911.ua/ua/shop/ibuprofen-darnitsya-tabl-200mg-50-p33514/reviews" class="score-rating-number">3</a>
//             <i class="score-rating small icon-s" style="width:75px"></i>
//         </div>
//     </div>

// <div class="b-prod__option clearfix">
//     <div class="b-prod__price big">
//             <div class="price-new">91.50 <small>грн.</small></div>
//     </div>
//     <c-buy-item item-data="{{products[1]}}" btn-size="btn-s"></c-buy-item>
//         <a href="https://apteka911.ua/ua/shop/ibuprofen-p33514/kiev" class="btn btn-outline-secondary btn-s" title="Наявність Ібупрофен-Дарниця табл. 200мг №50 в аптеках" v-ga-click="products[1]" v-ga-data-layer-click="{ d: products[1], event: 'avail_in_pharm' }"><i class="icon-your-pharmacy"></i>Де є</a>
// </div>
// </div>
// </div>

// <div class="block-prod-full extra-small" v-analytics-product="{'listName': 'search', 'product': products[2]}">
// <div class="prod__left">
//     <div class="b-prod__thumb" itemscope itemtype='https://schema.org/ImageObject'>
//         <meta itemprop="contentUrl" content="https://apteka911.ua/content/shop/products/66576/ibuprofen-tabl-p-o-200mg-50-pao-vitaminyi-big-800x800-d480.jpg">
//         <meta itemprop="name" content="Ібупрофен табл. в/о 200мг №50">
//         <c-wish-item item-data="{{products[2]}}"></c-wish-item>
//         <a href="https://apteka911.ua/ua/shop/ibuprofen-tabl-v-o-200mg-50-p66576" v-ga-click="products[2]">
//             <img src="https://apteka911.ua/content/shop/products/66576/ibuprofen-tabl-p-o-200mg-50-pao-vitaminyi-cart-120x120-9537.jpg" width="120" height="120" alt="Ібупрофен табл. в/о 200мг №50" title="Купити Ібупрофен табл. в/о 200мг №50">
//         </a>
//     </div>
// </div>
// <div class="prod__right">
//     <div>
//         <p class="prod__header"><a href="https://apteka911.ua/ua/shop/ibuprofen-tabl-v-o-200mg-50-p66576" v-ga-click="products[2]">Ібупрофен табл. в/о 200мг №50</a></p>
//         <p class="maker">Виробник: Вітаміни</p>
//         <p class="maker">Країна: Україна</p>
//         <p class="maker">Бренд: <span class="g-uppercase">ІБУПРОФЕН</span></p>
//     </div>

// <div class="b-prod__option clearfix">
//     <div class="b-prod__price big">
//             <div class="price-new">80.50 <small>грн.</small></div>
//     </div>
//     <c-buy-item item-data="{{products[2]}}" btn-size="btn-s"></c-buy-item>
//         <a href="https://apteka911.ua/ua/shop/ibuprofen-p66576/kiev" class="btn btn-outline-secondary btn-s" title="Наявність Ібупрофен табл. в/о 200мг №50 в аптеках" v-ga-click="products[2]" v-ga-data-layer-click="{ d: products[2], event: 'avail_in_pharm' }"><i class="icon-your-pharmacy"></i>Де є</a>
// </div>
// </div>
// </div>
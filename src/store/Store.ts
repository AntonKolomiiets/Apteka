import {types, Instance} from 'mobx-state-tree';
import {searchAnc, searchApteka911, searchPodorozhnyk} from '../api/apiCalls';
// import {runInAction} from 'mobx';
import debounce from 'lodash.debounce';

const Drugs_results = types.model('Drugs', {
  id: types.identifierNumber,
  name: types.string,
  price: 0.0,
  store: types.string,
  picture: types.string,
});

export const RootStore = types
  .model('DrugsStore', {
    drugs: types.array(Drugs_results),
    searchString: types.string,
    isSearching: false,
  })
  .volatile(() => ({
    currentAbortController: null as AbortController | null, // read about it
    debouncedSearch: null as any,
  }))
  .actions(self => ({
    clearSearchResults() {
      self.drugs.clear();
    },
    addDrugs(drugs: any) {
      this.clearSearchResults();
      self.drugs = drugs;
    },
    setIsSearch(state: boolean) {
      self.isSearching = state;
    },
    setSearchString(string: string) {
      self.searchString = string;
      console.log(self.searchString);
      if (self.searchString) {
        this.debounceSearch();
      } else {
        this.clearSearchResults();
      }
    },
    async searchApi() {
      if (!self.searchString) {
        this.clearSearchResults();
      } else {
        this.setIsSearch(true);
        if (self.currentAbortController) {
          self.currentAbortController.abort();
        }

        const controller = new AbortController();
        self.currentAbortController = controller;

        try {
          const [anc, podorozhnyk, apteka911] = await Promise.all([
            searchAnc(self.searchString, controller.signal),
            searchPodorozhnyk(self.searchString, controller.signal),
            searchApteka911(self.searchString, controller.signal),
          ]);
          const resultsArray = [anc, podorozhnyk, apteka911].flat();
          this.addDrugs(resultsArray);
        } catch (error) {
          if (error instanceof Error) {
            if (error.name === 'AbortError') {
              console.log('Previous request was aborted');
              this.setIsSearch(false);
            } else {
              console.error('Error occurred:', error);
              this.setIsSearch(false);
            }
          }
        }
        this.setIsSearch(false);
      }
    },
    debounceSearch() {
      if (!self.debouncedSearch) {
        self.debouncedSearch = debounce(() => {
          console.log(`Calling debounced search with ${self.searchString}`);
          this.searchApi();
        }, 300);
      }
      self.debouncedSearch();
    },
  }))
  .views(self => ({
    get SortByPriceAcend() {
      // render drugs array sorted by drugs.price in accendent order
      return self.drugs
        .slice()
        .filter(drug => drug.price > 0)
        .sort((a, b) => a.price - b.price);
    },
  }));

export type RootStoreType = Instance<typeof RootStore>;

let rootStore: RootStoreType;
export function useStore() {
  if (!rootStore) {
    rootStore = RootStore.create({
      drugs: [
        //   {
        //     id: 1,
        //     name: 'Ібупром Спрінт капсули по 200 мг, 10 шт.',
        //     price: 50.4,
        //     store: 'podorozhnyk',
        //   },
        //   {
        //     id: 2,
        //     name: 'Ібупром Спрінт Макс (Ibuprom Sprint Мах) капсули по 400 мг, 20 шт.',
        //     price: 70.4,
        //     store: 'anc',
        //   },
        //   {
        //     id: 3,
        //     name: 'Ібуфен форте суспензія зі смаком полуниці по 200 мг/5мл, 100 мл',
        //     price: 170.4,
        //     store: '911',
        //   },
      ],
      searchString: '',
    });
  }
  return rootStore;
}

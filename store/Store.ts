import { types, Instance, applySnapshot } from "mobx-state-tree";
import { initialCall } from "@/api/apiCalls";

const HpCharacter = types
  .model("HpCharacter", {
    id: types.identifier,
    name: types.string,
    house: types.string,
    dateOfBirth: types.string,
    actor: types.string,
    species: types.string,
    picture: types.string,
    attempts: 0,
    isGuessed: false,
    guessedCorrectly: false,
  })
  .actions((self) => ({
    incrementAttempt() {
      self.attempts++;
    },
    resetAttempt() {
      self.attempts = 0;
    },
    setIsGuessed() {
      self.isGuessed = true;
    },
    reSetIsGuessed() {
      self.isGuessed = false;
    },
    setGuessedCorrectly() {
      self.guessedCorrectly = true;
    },
    reSetGuessedCorrectly() {
      self.guessedCorrectly = false;
    },
  }));

export const RootStore = types
  .model("RootStore", {
    charStack: types.array(HpCharacter),
    currentCharacter: types.safeReference(HpCharacter),
    isWin: false,
    switch: false,
    attemptsSum: 0,
    attemptsSuccesfull: 0,
    attemptsFailed: 0,
  })
  .actions((self) => ({
    async loadCharacters() {
      if (self.charStack.length === 0) {
        try {
          const characters = await initialCall();

          if (characters) {
            const mappedCharactersSnapshot = characters
              .filter((char: any) => char.image !== "")
              .map((char: any) =>
                HpCharacter.create({
                  id: char.id,
                  name: char.name,
                  house: char.house,
                  dateOfBirth: char.dateOfBirth ? char.dateOfBirth : "unknown",
                  actor: char.actor,
                  species: char.species,
                  picture: char.image,
                })
              );

            applySnapshot(self.charStack, mappedCharactersSnapshot);
            console.log("Loaded characters:", self.charStack.length);
            this.chooseRandomCharacter();
          } else {
            console.error("Invalid data format from API");
          }
        } catch (error) {
          console.error("Failed to load characters:", error);
        }
      } else if (!self.currentCharacter) {
        this.chooseRandomCharacter();
      }
    },
    setIsWin() {
      self.isWin = true;
    },
    reSetIsWin() {
      self.isWin = false;
    },
    setCurrentCharacter(character: HpCharacterType) {
      self.currentCharacter = character;
    },
    chooseRandomCharacter(id?: string) {
      if (self.charStack.length > 0) {
        const avalableCharacters = self.charStack.filter((item) => {
          return item.isGuessed === false;
        });
        if (id) {
          const characterById = avalableCharacters.find((item) => {
            return item.id === id;
          });
          if (characterById) {
            this.setCurrentCharacter(characterById);
          } else {
            throw new Error(`Unable to find character with id: ${id}`);
          }
        } else {
          const randomIndex = Math.floor(
            Math.random() * avalableCharacters.length
          );
          const randomCharacter = avalableCharacters[randomIndex];
          if (randomCharacter) {
            console.log("Character moved:", randomCharacter.name);
            this.setCurrentCharacter(randomCharacter);
          } else {
            this.setIsWin();
          }
          console.log("Remaining characters:", avalableCharacters.length);
        }
      } else {
        console.log("Could not load character");
      }
    },
    resetAttemptsSum() {
      self.attemptsSum = 0;
    },
    calculateAttemptsSum() {
      this.resetAttemptsSum();
      for (let i = 0; i < self.charStack.length; i++) {
        self.attemptsSum += self.charStack[i].attempts;
      }
    },
    resetAttemptsFailed() {
      self.attemptsFailed = 0;
    },
    incrementAttemptsFailed() {
      self.attemptsFailed++;
    },
    resetAttemptsSuccesfull() {
      self.attemptsSuccesfull = 0;
    },
    incrementAttemptsSuccesfull() {
      self.attemptsSuccesfull++;
    },
    resetAll() {
      for (let i = 0; i < self.charStack.length; i++) {
        self.charStack[i].resetAttempt();
        self.charStack[i].reSetIsGuessed();
        self.charStack[i].reSetGuessedCorrectly();
      }
      this.reSetIsWin();
      this.resetAttemptsSuccesfull();
      this.resetAttemptsFailed();
      this.calculateAttemptsSum();
      this.chooseRandomCharacter();
    },
  }))
  .actions((self) => ({
    afterCreate() {
      self.loadCharacters();
    },
  }));

export type RootStoreType = Instance<typeof RootStore>;
export type HpCharacterType = Instance<typeof HpCharacter>;

let rootStore: RootStoreType;
export function useStore() {
  if (!rootStore) {
    rootStore = RootStore.create({
      charStack: [],
    });
  }
  return rootStore;
}

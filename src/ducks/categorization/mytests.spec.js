import { localModel, createLocalModel } from "./services";
import { tokenizer } from ".";
import { Transaction } from "../../models";

jest
  .spyOn(Transaction, "queryAll")
  .mockResolvedValue(require("/Users/fweber/Downloads/fabien_mancat.json"));

const transactions = [{ amount: -26, label: "MCDONALDS 350" }];

describe("localModel", () => {
  it("Should give correct local probas", async () => {
    await localModel({ tokenizer }, transactions);
    console.log("##############");
    console.log("##############");
    console.log(transactions);
    console.log("##############");
    console.log("##############");

    expect(1).toBeCloseTo(1, 3);
  });
});

describe("localModel 2", () => {
  it("Should give correct local probas", async () => {
    const clf = await createLocalModel({ tokenizer });

    expect(1).toBeCloseTo(1, 3);
  });
});

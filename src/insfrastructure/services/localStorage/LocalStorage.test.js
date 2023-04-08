import localStorageService from "./LocalStorageService";

const farm_mock_1 = {
  id: "efdac96b-fa44-9975-12df-241cc132c545",
  name: "Fazenda Fictícia",
  owner: "Proprietário Fictício",
  address: {
    street: "Rua Fictícia",
    neighborhood: "Bairro Fictício",
    state: "Estado Fictício",
    city: "Cidade Fictícia",
    country: "País Fictício",
  },
  polygon: {
    center: [-2.5595206294757338, -44.23813462257385],
    coordinates: [
      [-2.5565195533503284, -44.24275875091553],
      [-2.563250538732931, -44.24331665039063],
      [-2.5625645800575576, -44.23267364501954],
      [-2.5557478457621174, -44.233789443969734],
    ],
  },
};

const farm_mock_2 = {
  id: "01c1187c-2d96-21f6-6245-cf38f1cbf317",
  name: "Fazenda Fictícia 2",
  owner: "Proprietário Fictício 2",
  address: {
    street: "Rua Fictícia 2",
    neighborhood: "Bairro Fictício 2",
    state: "Estado Fictício 2",
    city: "Cidade Fictícia 2",
    country: "País Fictício 2",
  },
  polygon: {
    center: [-2.5676985368838197, -44.23813462257386],
    coordinates: [
      [-2.564065114182433, -44.24155712127686],
      [-2.5727681773709055, -44.24190044403077],
      [-2.570410210444134, -44.23589229583741],
      [-2.563550645537805, -44.2331886291504],
    ],
  },
};

const farms_mock = [farm_mock_1, farm_mock_2];

const wrong_id = "00c2199c-2d96-96a3-7811-cf38f1cbf000";

describe("getAll", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return an empty array if localStorage is empty", () => {
    const result = localStorageService.getAll();
    expect(result).toEqual([]);
  });

  it("should return an array with Farms if localStorage has data", () => {
    localStorageService.saveAll(farms_mock);
    const farms = localStorageService.getAll();
    expect(farms).toEqual(farms_mock);
  });
});

describe("save", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should add a new farm to local storage", () => {
    localStorageService.save(farm_mock_1);

    const farms = localStorageService.getAll();
    expect(farms).toHaveLength(1);
    expect(farms[0]).toEqual(farm_mock_1);
  });
});

describe("saveAll", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should save farms to local storage", () => {
    localStorageService.saveAll(farms_mock);

    const farms = localStorageService.getAll();
    expect(farms).toHaveLength(2);
    expect(farms[0]).toEqual(farm_mock_1);
    expect(farms[1]).toEqual(farm_mock_2);
  });
});

describe("remove", () => {
  beforeEach(() => {
    localStorageService.saveAll(farms_mock);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("removes a farm from the storage by id", () => {
    localStorageService.remove(farm_mock_2.id);
    const farms = localStorageService.getAll();
    expect(farms).toEqual([farm_mock_1]);
  });

  it("does not remove any farm if the id does not exist", () => {
    localStorageService.remove(wrong_id);
    const farms = localStorageService.getAll();
    expect(farms).toEqual(farms_mock);
  });
});

describe("edit", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should edit farm according to id", () => {
    localStorageService.save(farm_mock_1);
    localStorageService.edit(farm_mock_1.id, farm_mock_2);

    const farms = localStorageService.getAll();
    expect(farms).toEqual([farm_mock_2]);
  });
});

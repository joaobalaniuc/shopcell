import axios from 'axios';

// Pode ser algum servidor executando localmente:
// http://localhost:3000

const api = axios.create({
  baseURL: 'http://189.50.11.118:29027',
});

export default api;

// Base request function
function request(uri, content) {
  return api.post(uri, content)
    .then(resp => {
      return resp.data;
    }).catch(err => {
      console.log(err);
      return err;
    });
}

// Ath functions
export async function auth(matrix_id, login, pass) {
  return await request('/login', { matrix_id, login, pass });
};


// Cashiers functions
export async function listCashiers(content) {
  return await request('/listcashier', content);
};
export async function findCashier(content) {
  return await request('/findcashier', content);
};
export async function addCashier(content) {
  return await request('/addcashier', content);
};
export async function updateCashier(content) {
  return await request('/updatecashier', content);
};
export async function deleteCashier(content) {
  return await request('/deletecashier', content);
};

// Client functions
export async function listClients(content) {
  return await request('/listclients', content);
};
export async function findClient(content) {
  return await request('/findclient', content);
};
export async function addClient(content) {
  return await request('/addclient', content);
};
export async function updateClient(content) {
  return await request('/updateclient', content);
};
export async function deleteClient(content) {
  return await request('/deleteclient', content);
};


// Additional function Client
export async function listBranches(content) {
  return await request('/listbranches', content);
};


// Family functions
export async function listFamilies(content) {
  return await request('/families', content);
};
export async function findFamily(content) {
  return await request('/findfamily', content);
};
export async function addFamily(content) {
  return await request('/addfamily', content);
};
export async function updateFamily(content) {
  return await request('/updatefamily', content);
};
export async function deleteFamily(content) {
  return await request('/deletefamily', content);
}; 

// Group functions
export async function listGroups(content) {
  return await request('/groups', content);
};
export async function findGroup(content) {
  return await request('/findgroup', content);
};
export async function addGroup(content) {
  return await request('/addgroup', content);
};
export async function updateGroup(content) {
  return await request('/updategroup', content);
};
export async function deleteGroup(content) {
  return await request('/deletegroup', content);
};


// Grid functions
export async function listGrids(content) {
  return await request('/grids', content);
};
export async function findGrid(content) {
  return await request('/findgrid', content);
};
export async function addGrid(content) {
  return await request('/addgrid', content);
};
export async function updateGrid(content) {
  return await request('/updategrid', content);
};
export async function deleteGrid(content) {
  return await request('/deletegrid', content);
};


// Payment functions
export async function listPMethods(content) {
  return await request('/paymentmethods ', content);
};
export async function findPMethod(content) {
  return await request('/findpaymentmethod ', content);
};
export async function addPMethod(content) {
  return await request('/addpaymentmethod', content);
};
export async function updatePMethod(content) {
  return await request('/updatepaymentmethod', content);
};
export async function deletePMethod(content) {
  return await request('/deletepaymentmethod', content);
};


// Plan functions
export async function listPlans(content) {
  return await request('/listplans', content);
};
export async function findPlan(content) {
  return await request('/findplan', content);
};
export async function addPlan(content) {
  return await request('/addplan', content);
};
export async function updatePlan(content) {
  return await request('/updateplan', content);
};
export async function deletePlan(content) {
  return await request('/deleteplan', content);
};

// Product functions
export async function listProducts(content) {
  return await request('/listproducts', content);
};
export async function findProduct(content) {
  return await request('/findproduct', content);
}; 
export async function addProduct(content) {
  // console.log(JSON.stringify( content, null, 4))
  return await request('/addproduct', content); 
};
export async function updateProduct(content) {
  return await request('/updateproduct', content);
};
export async function deleteProduct(content) {
  return await request('/deleteproduct', content);
};

// Stock functions
export async function listStocks(content) {
  return await request('/liststocks', content);
};
export async function findStock(content) {
  return await request('/findstock', content);
};
export async function addStock(content) {
  
  return await request('/addstock', content);
};
export async function updateStock(content) {
  return await request('/updatestock', content);
};
export async function deleteStock(content) {
  return await request('/deletestock', content);
};
// Additional function Stock
export async function countStock(content) {
  return await request('/countstock', content);
};

export async function resumeStock(content) {
  return await request('/stockresume', content);
};


// Subject functions
export async function listSubjects(content) {
  return await request('/listsubjects', content);
};
export async function findSubject(content) {
  return await request('/findsubject', content);
};
export async function addSubject(content) {
  return await request('/addsubject', content);
};
export async function updateSubject(content) {
  return await request('/updatesubject', content);
};
export async function deleteSubject(content) {
  return await request('/deletesubject', content);
};


// transactions functions
export async function transations(content) {
  return await request('/transations', content);
};
export async function findTransation(content) {
  return await request('/findtransation', content);
};
export async function addTransation(content) {
  return await request('/addtransation', content);
};
export async function updateTransation(content) {
  return await request('/updatetransation', content);
};
export async function deleteTransation(content) {
  return await request('/deletetransation', content);
};
// Additional function transation
export async function resumeTransation(content) {
  return await request('/resumetransation', content);
};


// User functions
export async function listUsers(content) {
  return await request('/listusers', content);
};
export async function findUser(content) {
  return await request('/finduser', content);
};
export async function addUser(content) {
  return await request('/adduser', content);
};
export async function updateUser(content) {
  console.log(JSON.stringify(content,null,4))
  return await request('/updateuser', content);
};
export async function deleteUser(content) {
  return await request('/deleteuser', content);
};

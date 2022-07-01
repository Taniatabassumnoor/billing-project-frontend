import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./Components/Authentication/Registration";
import BillingList from "./Components/Billing/BillingList";
import AddBilling from "./Components/Billing/AddBilling";
import UpdateBilling from "./Components/Billing/UpdateBilling";
import Login from "./Components/Authentication/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />}></Route>
          <Route path="/billingList" element={<BillingList />}></Route>
          <Route path="/update/:id" element={<UpdateBilling />}></Route>
          <Route path="/addBill" element={<AddBilling />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Routes>
        <Route exact path="/" element={<Registration />} />
        <Route exact path="/billingList" element={<BillingList />} />
      </Routes> */}
      {/* <Registration />
      <BillingList /> */}
    </div>
  );
}

export default App;

import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Model from "./components/Model";
import { PRODUCTS, PROMOCODES } from "./mock-data";

function App() {
  console.log("RUN APP");

  const [products, setProducts] = useState(PRODUCTS);

  const [checkpromo, setCheckPromo] = useState("");

  const [isdiscount, setIsDiscount] = useState(false);

  const [numberdiscount, setNumberDiscount] = useState(0);

  const [modelVisibility, setModelVisibility] = useState(false);

  const [deleteID, setDeleteID] = useState(0);

  function removeItem(id) {
    setModelVisibility(true);
    setDeleteID(id);
  }

  function changeQuantity(event, productID) {
    let arr = [...products];
    let index = arr.findIndex((product) => product.id === productID);
    const inputValue = event.target.value;
    arr[index].quantity = Number(inputValue);
    setProducts(arr);
  }

  function usePromoCode() {
    console.log(checkpromo);
    for (let i = 0; i < PROMOCODES.length; i++) {
      if (checkpromo === PROMOCODES[i].name) {
        setIsDiscount(true);
        setNumberDiscount(PROMOCODES[i].percentage);
        console.log(isdiscount);
        console.log(numberdiscount);
        return;
      }
      setIsDiscount(false);
      setNumberDiscount(0);
    }
  }

  function formatCurrency(amount) {
      //truncate the amount to 0 decimals
      //for every digit that is followed by 3 digits and a word boundary
      //add a comma
			amount = amount.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g, "$1,");
			return amount;
	  }

  let totalQuantity = products.reduce(
    (total, product) => (total += product.quantity),
    0
  );

  let sum = 0;

  const totalPrice = function () {
    let totalprice = 0;
    for (let i = 0; i < products.length; i++) {
      totalprice += products[i].quantity * products[i].price;
    }
    sum = totalprice;
    return totalprice;
  };

  const taxCal = function () {
    let a = ((sum / 100) * 10);
    return a;
  };

  const afterTaxPrice =
  formatCurrency(parseInt(totalPrice() * (100 - numberdiscount) * 0.01) + parseInt(taxCal()));

  return (
    <main>
      <Header totalQuantity={totalQuantity} />

      <Body
        products={products}
        changeQuantity={changeQuantity}
        removeItem={removeItem}
        formatCurrency={formatCurrency}
      />

      <Footer
        checkpromo={checkpromo}
        products={products}
        isdiscount={isdiscount}
        setProducts={setProducts}
        setCheckPromo={setCheckPromo}
        usePromoCode={usePromoCode}
        totalPrice={totalPrice}
        taxCal={taxCal}
        numberdiscount={numberdiscount}
        afterTaxPrice={afterTaxPrice}
        formatCurrency={formatCurrency}
      />

      {/* <Model message={"Ban co muon xoa khong"}/> */}

      {modelVisibility && (
        <Model
          message={"Are you sure"}
          products={products}
          setModelVisibility={setModelVisibility}
          setProducts={setProducts}
          deleteID={deleteID}
        />
      )}
    </main>
  );
}

export default App;

import "./App.css";
import { useState } from "react";
const PRODUCTS = [
  {
    id: 1,
    name: "Controller",
    description: "Gamepad for console",
    image: "https://images-na.ssl-images-amazon.com/images/I/61nsEtw26mL.jpg",
    price: 50,
    quantity: 2,
  },
  {
    id: 2,
    name: "Console",
    description: "Gaming machine",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/61p7mgi0GAL._AC_SL1200_.jpg",
    price: 700,
    quantity: 1,
  },
  {
    id: 3,
    name: "Headset",
    description: "Headphone for console",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51fcMvbXXKL._AC_SL1000_.jpg",
    price: 100,
    quantity: 1,
  },
  {
    id: 4,
    name: "Webcam",
    description: "Webcam for console",
    image:
      "https://www.windowscentral.com/sites/wpcentral.com/files/field/image/2019/04/logitech-c925-e.jpg?itok=u5mhZgzj",
    price: 80,
    quantity: 1,
  },
];

const PROMOCODES = [
  {
    id: 1,
    name: "FIRSTBUY",
    percentage: 10,
  },
  {
    id: 2,
    name: "BLACKFRIDAY",
    percentage: 15,
  },
  {
    id: 3,
    name: "WINTERSALE",
    percentage: 20,
  },
];

function App() {
  console.log("RUN APP");

  const [products, setProducts] = useState(PRODUCTS);

  const [checkpromo, setCheckPromo] = useState("");

  const [isdiscount, setIsDiscount] = useState(false);

  const [numberdiscount, setNumberDiscount] = useState(0);

  function removeItem(id) {
    setProducts(products.filter((product) => product.id !== id));
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

  const listProducts = products.map((product) => (
    <li className="row" key={product.id}>
      <div className="col left">
        <div className="thumbnail">
          <a href="1">
            <img src={product.image} alt="" />
          </a>
        </div>
        <div className="detail">
          <div className="name">
            <a href="1">{product.name}</a>
          </div>
          <div className="description">{product.description}</div>
          <div className="price">{"$" + product.price}</div>
        </div>
      </div>

      <div className="col right">
        <div className="quantity">
          <input
            type="number"
            className="quantity"
            step={1}
            value={product.quantity}
            onChange={(event) => changeQuantity(event, product.id)}
          />
        </div>

        <div className="remove">
          <svg
            version="1.1"
            className="close"
            xmlns="//www.w3.org/2000/svg"
            xmlnsXlink="//www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 60 60"
            enableBackground="new 0 0 60 60"
            xmlSpace="preserve"
            onClick={() => removeItem(product.id)}
          >
            <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812"></polygon>
          </svg>
        </div>
      </div>
    </li>
  ));

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
    let a = ((sum / 100) * 10).toFixed(2);
    return a;
  };

  const afterTaxPrice =
    parseInt(totalPrice() * (100 - numberdiscount) * 0.01) + parseInt(taxCal());

  return (
    <main>
      <header className="container">
        <h1>Shopping Cart</h1>

        <ul className="breadcrumb">
          <li>Home</li>
          <li>Shopping Cart</li>
        </ul>

        <span className="count">{totalQuantity} items in the bag</span>
      </header>

      <section className="container">
        <ul className="products">{listProducts}</ul>
      </section>
      <div>
        {products.length === 0 ? (
          <section className="container">
            <div className="detail">
              <div className="name">Không có sản phẩm nào trong giỏ hàng</div>
              <div className="checkout">
                <button
                  type="button"
                  className="button-back"
                  onClick={() => setProducts(PRODUCTS)}
                >
                  Quay lại mua hàng
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="container">
            <div className="promotion">
              <label htmlFor="promo-code">Have A Promo Code?</label>
              <input
                type="text"
                id="promo-code"
                value={checkpromo}
                onChange={(event) => {
                  setCheckPromo(event.target.value);
                }}
              />{" "}
              <button type="button" onClick={usePromoCode}></button>
            </div>

            <div className="summary">
              <ul>
                <li>
                  Subtotal <span>${totalPrice()}</span>
                </li>
                <li>
                  Tax <span>${taxCal()}</span>
                </li>
                {isdiscount && (
                  <li>
                    Discount <span>{numberdiscount}%</span>
                  </li>
                ) }
                <li className="total">
                  Total <span>${afterTaxPrice}</span>
                </li>
              </ul>
            </div>

            <div className="checkout">
              <button type="button">Check Out</button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;

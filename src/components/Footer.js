import {PRODUCTS} from "../mock-data"
export default function Footer ( {checkpromo, products, isdiscount, setProducts, setCheckPromo, usePromoCode, totalPrice, taxCal, numberdiscount, afterTaxPrice, formatCurrency} ) {
    return (
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
                  Subtotal <span>${formatCurrency(totalPrice())}</span>
                </li>
                <li>
                  Tax <span>${formatCurrency(taxCal())}</span>
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
    )
}
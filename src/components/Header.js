export default function Header ( {totalQuantity} ) {
    return (
        <header className="container">
        <h1>Shopping Cart</h1>

        <ul className="breadcrumb">
          <li>Home</li>
          <li>Shopping Cart</li>
        </ul>

        <span className="count">{totalQuantity} items in the bag</span>
      </header>
    );
}
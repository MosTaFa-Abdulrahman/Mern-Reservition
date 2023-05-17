import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <a>about us</a>
              </li>
              <li>
                <a>our services</a>
              </li>
              <li>
                <a>privacy policy</a>
              </li>
              <li>
                <a>affiliate program</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>get help</h4>
            <ul>
              <li>
                <a>FAQ</a>
              </li>
              <li>
                <a>shipping</a>
              </li>
              <li>
                <a>returns</a>
              </li>
              <li>
                <a>order status</a>
              </li>
              <li>
                <a>payment options</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a>
                <i className="fab fa-twitter"></i>
              </a>
              <a>
                <i className="fab fa-instagram"></i>
              </a>
              <a>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import '../styles/globals.css'
import Footer from '../components/Footer/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <div className="main">
      <header id="header">
        {/* Navbar */}
        <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
            <div className="container header">
                {/* Navbar Brand*/}
                <a className="navbar-brand" href="/">
                    <img className="navbar-brand-sticky" src="../assets/img/logo.png" alt="sticky brand-logo" />
                </a>
                {/* Navbar */}
                <ul className="navbar-nav items mx-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link">Mint NFT</a>
                    </li>
                </ul>

                {/* Navbar Toggler */}
                <ul className="navbar-nav toggle">
                    <li className="nav-item">
                        <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                            <i className="fas fa-bars toggle-icon m-0" />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
      </header>
      <Component {...pageProps} />
      <div id="menu" className="modal fade p-0">
        <div className="modal-dialog dialog-animated">
            <div className="modal-content h-100">
                <div className="modal-header" data-dismiss="modal">
                    Menu <i className="far fa-times-circle icon-close" />
                </div>
                <div className="menu modal-body">
                    <div className="row w-100">
                        <div className="items p-0 col-12 text-center" />
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MyApp

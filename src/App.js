import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Blog from './pages/Knowledge/Blog'
import ProductList from './pages/Product/ProductList'
import ProductPageDetail from './pages/Product/ProductPageDetail'
<<<<<<< HEAD
import Member from './pages/member/Member'
import Cart from './pages/Product/Cart'
import Checkout from './pages/Product/Checkout'
=======
import Member from '../src/pages/member/Member'
import ServiceQuery from './pages/service/ServiceQuery'
>>>>>>> c0664b0ac30b1d3d638ac2da4ef156ed5db2bcd7

function App() {
  return (
    <Router>
      <>
        <Header />
<<<<<<< HEAD
        <div className="container py-3">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/member">
              <Member />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/productlist">
              <ProductList />
            </Route>
            <Route path="/productpagedetail">
              <ProductPageDetail />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
          </Switch>
        </div>
=======
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/member">
            <Member />
          </Route>
          <Route path="/service/query">
            <ServiceQuery />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/productlist">
            <ProductList />
          </Route>
          <Route path="/productpagedetail">
            <ProductPageDetail />
          </Route>
        </Switch>
>>>>>>> c0664b0ac30b1d3d638ac2da4ef156ed5db2bcd7
        <Footer />
      </>
    </Router>
  )
}

export default App

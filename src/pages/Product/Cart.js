import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, ButtonGroup, Button, Card } from 'react-bootstrap'
import { MdPlaylistAdd, MdDelete, MdAddShoppingCart } from 'react-icons/md'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import $ from 'jquery'
const Cart = () => {
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])

  //提取購物車資料
  function getCartFromLocalStorage() {
    const newCart = localStorage.getItem('cart') || []
    setMycart(JSON.parse(newCart))
  }

  //更新商品數量
  function updateQuantityToLocalStorage(e, index, quantity) {
    let currentCart = JSON.parse(localStorage.getItem('cart')) || []
    if (e.target.id === '-') {
      if (currentCart[index].pQuantity - quantity === 0) {
        currentCart[index].pQuantity = 1
      } else {
        currentCart[index].pQuantity = currentCart[index].pQuantity - quantity
      }
    } else {
      currentCart[index].pQuantity = currentCart[index].pQuantity + quantity
    }

    const newCart = currentCart
    localStorage.setItem('cart', JSON.stringify(newCart))
    setMycart(newCart)
  }

  //刪除商品
  function deleteItem(index) {
    console.log(index)
    let currentCart = JSON.parse(localStorage.getItem('cart')) || []
    currentCart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(currentCart))
    setMycart(currentCart)
  }

  //從localStorage取得購物車資料
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

  //購物車有變動即更改
  useEffect(() => {
    let newMycartDisplay = []
    for (let i = 0; i < mycart.length; i++) {
      const index = newMycartDisplay.findIndex(
        item => item.pId === mycart[i].pId
      )
      if (index !== -1) {
        newMycartDisplay[index].pQuantity += mycart[i].pQuantity
      } else {
        const newItem = { ...mycart[i] }
        newMycartDisplay = [...newMycartDisplay, newItem]
      }
    }
    setMycartDisplay(newMycartDisplay)
  }, [mycart])

  //計算總價
  const sum = items => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].pQuantity * items[i].pPrice
    }
    return total
  }

  return (
    <Container>
      <Row>
        <Col md={12} className="mt-5 d-flex justify-content-center">
          <Col md={7} className="border position-relative">
            <div
              className="rounded bg-primary position-absolute rounded-circle"
              style={{
                width: 20 + 'px',
                height: 20 + 'px',
                left: (-10 / 647.484) * 100 + '%',
                top: -10,
              }}
            ></div>
            <div
              className="rounded bg-dark position-absolute rounded-circle"
              style={{
                width: 20 + 'px',
                height: 20 + 'px',
                left: (313.742 / 647.484) * 100 + '%',
                top: -10,
              }}
            ></div>
            <div
              className="rounded bg-dark position-absolute rounded-circle"
              style={{
                width: 20 + 'px',
                height: 20 + 'px',
                left: (637.484 / 647.484) * 100 + '%',
                top: -10,
              }}
            ></div>
          </Col>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="d-flex justify-content-center">
          <Col md={7} className="position-relative">
            <div
              className="position-absolute "
              style={{
                left: (-21.6015 / 647.484) * 100 + '%',
                top: 10,
              }}
            >
              購物車
            </div>
            <div
              className="position-absolute "
              style={{
                left: (294.9375 / 647.484) * 100 + '%',
                top: 10,
              }}
            >
              付款資料
            </div>{' '}
            <div
              className="position-absolute "
              style={{
                right: (-28.805 / 647.484) * 100 + '%',
                top: 10,
              }}
            >
              訂單資料
            </div>
          </Col>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={12}>
          <Row className="mt-5">
            <Col>
              {mycartDisplay.length === 0 ? (
                <>
                  <h3>購物車內沒有任何商品</h3>
                  <hr />
                  <Button>繼續選購</Button>
                  <img src="#" alt="..." />
                </>
              ) : (
                <h3>以下是你購物車內的商品 NT${sum(mycartDisplay)}</h3>
              )}
              <hr />
            </Col>
          </Row>
          {mycartDisplay.map((value, index) => {
            return (
              <Row className="align-items-center" key={value.pId}>
                <Col md={4} className="text-center">
                  <img src="https://via.placeholder.com/200x200" alt="..." />
                </Col>
                <Col md={2}>
                  <h3 className="font-weight-bold">{value.pName}</h3>
                  <h4>數量:{value.pQuantity}</h4>
                  <h4>價格:{value.pPrice}</h4>
                </Col>
                <Col md={2}>
                  <ButtonGroup className="mb-md-2">
                    <Button
                      className="border-dark bg-light text-dark"
                      id="-"
                      onClick={e => {
                        updateQuantityToLocalStorage(e, index, 1)
                      }}
                    >
                      -
                    </Button>
                    <Button
                      className="border-dark bg-light text-dark"
                      value={value.pQuantity}
                      type="input"
                    >
                      {value.pQuantity}
                    </Button>
                    <Button
                      className="border-dark bg-light text-dark"
                      id="+"
                      onClick={e => {
                        updateQuantityToLocalStorage(e, index, 1)
                      }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </Col>
                <Col md={2}>
                  <h4 className="text-center font-weight-bold">
                    NT${value.pQuantity * value.pPrice}
                  </h4>
                </Col>
                <Col md={2}>
                  <Button className="mb-2" variant="primary" size="md">
                    <MdPlaylistAdd className="mb-md-1" />
                    下次再買
                  </Button>
                  <Button
                    className="mb-2"
                    variant="primary"
                    size="md"
                    onClick={() => {
                      deleteItem(index)
                    }}
                  >
                    <MdDelete className="mb-md-1" />
                    刪除商品
                  </Button>
                </Col>
                <Col>
                  <hr />
                </Col>
              </Row>
            )
          })}
        </Col>
      </Row>
      <Row className="mt-1">
        <Col md={{ offset: 6 }} className="d-flex justify-content-between">
          <div>小計</div>
          <div>價格</div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={{ offset: 6 }} className="d-flex justify-content-between">
          <div>運費</div>
          <div>免額外運費</div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={{ offset: 6 }}>
          <Button
            className="bg-transparent border-0 text-dark p-0"
            onClick={e => {
              $('#coupon')
                .toggle()
                .focus()
              if ($(e.target).hasClass('text-dark')) {
                $(e.target)
                  .removeClass('text-dark')
                  .addClass('text-primary')
              } else {
                $(e.target)
                  .removeClass('text-primary')
                  .addClass('text-dark')
              }
            }}
          >
            促銷代碼或優惠券
          </Button>
          <input id="coupon" type="text" className="b-0" />
          <hr />
        </Col>
      </Row>
      <Row className="mt-1">
        <Col md={{ offset: 6 }} className="d-flex justify-content-between">
          <div className="font-weight-bold">你的總金額</div>
          <div className="font-weight-bold">${sum(mycartDisplay)}</div>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col md={{ offset: 9 }}>
          <Link to="/checkout">
            <Button variant="primary" size="lg" block>
              前往結帳
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>追加購買</h3>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col md={3} className="mb-3">
          <Card className="shadow-sm">
            <img
              src="https://via.placeholder.com/250x150"
              className="card-img-top"
              alt="..."
            />
            <Card.Body className="text-center">
              <Card.Title>Book</Card.Title>
              <Card.Text>商品說明</Card.Text>
              <Card.Text className="d-md-flex justify-content-between">
                <del className="cart-text">NTD 200元</del>
                <Card.Text
                  className="text-danger"
                  style={{ textDecoration: 'underline' }}
                >
                  NTD 1000元
                </Card.Text>
              </Card.Text>
              <Button className="mb-md-2" variant="primary" size="md">
                <MdAddShoppingCart className="mb-1" />
                加入購物車
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="shadow-sm">
            <img
              src="https://via.placeholder.com/250x150"
              className="card-img-top"
              alt="..."
            />
            <Card.Body className="text-center">
              <Card.Title>Book</Card.Title>
              <Card.Text>商品說明</Card.Text>
              <Card.Text className="d-md-flex justify-content-between">
                <del className="cart-text">NTD 200元</del>
                <Card.Text
                  className="text-danger"
                  style={{ textDecoration: 'underline' }}
                >
                  NTD 1000元
                </Card.Text>
              </Card.Text>
              <Button className="mb-md-2" variant="primary" size="md">
                <MdAddShoppingCart className="mb-1" />
                加入購物車
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="shadow-sm">
            <img
              src="https://via.placeholder.com/250x150"
              className="card-img-top"
              alt="..."
            />
            <Card.Body className="text-center">
              <Card.Title>Book</Card.Title>
              <Card.Text>商品說明</Card.Text>
              <Card.Text className="d-md-flex justify-content-between">
                <del className="cart-text">NTD 200元</del>
                <Card.Text
                  className="text-danger"
                  style={{ textDecoration: 'underline' }}
                >
                  NTD 1000元
                </Card.Text>
              </Card.Text>
              <Button className="mb-md-2" variant="primary" size="md">
                <MdAddShoppingCart className="mb-1" />
                加入購物車
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="shadow-sm">
            <img
              src="https://via.placeholder.com/250x150"
              className="card-img-top"
              alt="..."
            />
            <Card.Body className="text-center">
              <Card.Title>Book</Card.Title>
              <Card.Text>商品說明</Card.Text>
              <Card.Text className="d-md-flex justify-content-between">
                <del className="cart-text">NTD 200元</del>
                <Card.Text
                  className="text-danger"
                  style={{ textDecoration: 'underline' }}
                >
                  NTD 1000元
                </Card.Text>
              </Card.Text>
              <Button
                className="mb-md-2"
                variant="primary"
                size="md"
                onClick={() => alert('hello')}
              >
                <MdAddShoppingCart className="mb-1" />
                加入購物車
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>運貨與退貨通知</h3>
          <hr />
          <p className="px-3">
            如果你需要退貨，可以辦理免額外付費運送退貨商品，也可以將商品退回任一間
            Apple 直營店。如果是符 合退貨條件的產品，你可在收到訂單商品的 14
            天內開始辦理退貨。只須登入你的帳戶，或撥打電話聯絡我 們：
            0800-020-021。如果你需要退貨，可以辦理免額外付費運送退貨商品，也可以將商品退回任一間
            Apple 直營店。如果是符合退貨條件的產品，你可在收到訂單商品的 14
            天內開始辦理退貨。只須登入你的 帳戶，或撥打電話聯絡我們：
            0800-020-021。如果你需要退貨，可以辦理免額外付費運送退貨商品，也可
            以將商品退回任一間 Apple
            直營店。如果是符合退貨條件的產品，你可在收到訂單商品的 14
            天內開始辦理 退貨。只須登入你的帳戶，或撥打電話聯絡我們：
            0800-020-021。
          </p>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = store => {
  return {
    total: store.counter,
    addCart: store.saveProductToCart,
  }
}

export default withRouter(connect(mapStateToProps)(Cart))

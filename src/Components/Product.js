import { Component } from 'react';
import { connect } from 'react-redux';
import { PriceStyle } from '../Components/styles/Price.style';
import { AmountStyled } from './styles/Amount.style';
import { AddToCart } from './styles/Product.style';
import {
  cartProducts,
  cartItems,
  quantity,
  price,
  attribute,
  } from '../actions/index';

class Product extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.selectValue = this.selectValue.bind(this);
    this.attr = {}
    this.state = {
        id: this.props.itemId.id,
        qty: 0,
        img: 0,
    };
  };

  addToCart(e, amount) {
    e.preventDefault();
    this.props.quantity(1);
    const product = this.props.productReducer.product;
    this.props.cartProductsReducer(product);
    this.setState({
      qty: this.state.qty + 1,
    });
    this.props.qty({
      id: this.state.id,
      qty: this.state.qty,
      amount: amount
    });
    this.props.attributeData(this.attr);
  };

  changeImage(index){
    this.setState({
      img: index
    });
  };

  

  selectValue(name, index, val) {
    this.attr[name] = val;
    this.attr['id'] = this.state.id;
    this.setState({
      activeIndex: index,
    })
  };

  render(){
    if(!(this.props.productReducer == null)){
      return(
        <div className='w-1'>
            <div className='sml-img-div'>
              {this.props.productReducer.product.gallery.map((img, index) => {
                  return <div key={index} onClick ={() => this.changeImage(index)}><img src={img}
                   alt='Products' className='sml-img' /></div>
              })}
            </div>
          <div> 
              <div className='bg-img'
                   style={{backgroundImage: `url(${this.props.productReducer.product.gallery[this.state.img]})`,
                                              backgroundRepeat: 'no-repeat',
                                              backgroundPosition: 'center',
                                              backgroundSize: 'cover'}}>
              </div>
          </div>
          <div>
            <div className='ppn font-style'>{this.props.productReducer.product.name}</div>
            <div>
              {
              this.props.productReducer.product.attributes.length > 0 ?
              
                this.props.productReducer.product.attributes.map((attribute, index) => {
                  return  <div className='color-di' key={attribute.name}>
                    <div className='size' key={attribute.name}>{attribute.name}:</div>
                    <div className='d-flex' key={index}>
                      {attribute.items.map((att, index) => {
                        if(attribute.name === 'Color') {
                          return(
                            <div className='d-flex j-content' key={att.value}>
                                <button className='color'
                                         onClick={(e) => this.selectValue(attribute.name, index, att.value)}
                                         key={att.value} style={(Object.values(this.attr).includes(att.value ||
                                                                 Object.keys(this.attr).includes(attribute.name)))?
                                                               {border: '3px dotted #52D67A', backgroundColor: att.value}:
                                                               {backgroundColor: att.value}}>
                                </button>
                            </div>
                          )
                        }
                        return <div style={{border: '1px solid #1D1F22'}} onClick={(e) => this.selectValue(attribute.name, index, att.value)}
                                    key={att.value} className={(Object.values(this.attr).includes(att.value ||
                                                                Object.keys(this.attr).includes(attribute.name))) ?
                                                               'attribute-design color': 'border color'}>{att.value}</div>
                      })
                      }
                    </div>
                    </div>
                })
               : <div></div>
              }
              <div className=''>
                <PriceStyle>Price:</PriceStyle>
                  {this.props.productReducer.product.prices.map((price, index) => {
                    if(price.currency.label !== this.props.currency) return null
                      return (
                              <AmountStyled key={index}>
                                <div>{price.currency.symbol}</div>
                                <span>{price.amount}</span>
                              </AmountStyled>)
                  })}
              </div>
            </div>
            <div className='cart'>
              {this.props.productReducer.product.prices.map((price) => {
              if(price.currency.label !== this.props.currency) return null
                  return (
                    <AddToCart key={price.amount} onClick={(e) => this.addToCart(e, price.amount)}>
                      ADD TO CART
                    </AddToCart>
                  )
              })}
            </div>
            <div dangerouslySetInnerHTML={ { __html: this.props.productReducer.product.description } }
                 className='describe' /></div>
        </div>
      );
    };
  };
};

const mapStateToProps = (state) => {
  return {
    productReducer: state.productReducer.data.data,
    itemId: state.itemIdReducer.id,
    currency: state.currencyReducer.label,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartProductsReducer: (product) => dispatch(cartProducts(product)),
    qty: items => dispatch(cartItems(items)),
    quantity: count => dispatch(quantity(count)),
    itemPrice: pr => dispatch(price(pr)),
    attributeData: attr => dispatch(attribute(attr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

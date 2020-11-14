import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

function totalItems(cart) {
	return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class Payment extends React.Component {
	render() {
		const onToken = (res) => {
			console.log('TOKEN', res);
		}

		return (
			<User>
				{ ({ data: { me } }) => (
					<StripeCheckout
						amount={ calcTotalPrice(me.cart) }
						name="eCommerce"
						description={ `Order of ${totalItems(me.cart)} ` }
						image={ me.cart[0].item && me.cart[0].item.image }
						stripeKey="pk_test_51HnSGGJx0OaSHurubWJKVa4cdMj9DKq6WoZWjj3TFg5uxyojGA8U7gfs4qWzkSzIeQXxRaGyaEIwgbAPVH2jXxVL00DPqIxwjK"
						currency="CAD"
						email={ me.email }
						token={ res => this.onToken(res) }
					>
						{ this.props.children }
					</StripeCheckout>
				) }
			</User>
		);
	}
}

export default Payment;
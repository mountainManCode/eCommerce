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

const CREATE_ORDER_MUTATION = gql`
	mutation createOrder($token: String!) {
		createOrder(token: $token) {
			id
			charge
			total
			items {
				id
				title
			}
		}
	}
`;

function totalItems(cart) {
	return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class Payment extends React.Component {
	onToken = async (res, createOrder) => {
		// manually call the mutation once we have the Stripe Token.
		const order = await createOrder({
			variables: {
				token: res.id
			}
		}).catch(err => {
			alert(err.message);
		});
		console.log(order);
	};

	render() {
		return (
			<User>
				{ ({ data: { me } }) => (
					<Mutation mutation={ CREATE_ORDER_MUTATION } refetchQueries={ [{ query: CURRENT_USER_QUERY }] }>
						{ createOrder => (
							<StripeCheckout
								amount={ calcTotalPrice(me.cart) }
								name="eCommerce"
								description={ `Order of ${totalItems(me.cart)} ` }
								image={ me.cart.length && me.cart[0].item && me.cart[0].item.image }
								stripeKey="pk_test_51HnSGGJx0OaSHurubWJKVa4cdMj9DKq6WoZWjj3TFg5uxyojGA8U7gfs4qWzkSzIeQXxRaGyaEIwgbAPVH2jXxVL00DPqIxwjK"
								currency="CAD"
								email={ me.email }
								token={ res => this.onToken(res, createOrder) }
							>
								{ this.props.children }
							</StripeCheckout>
						) }
					</Mutation>
				) }
			</User>
		);
	}
}

export default Payment;
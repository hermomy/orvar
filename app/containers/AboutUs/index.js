/**
 *
 * AboutUs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { dataChecking } from 'globalUtils';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Accordion from 'components/Accordion';

import makeSelectAboutUs from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import {
    getCareer,
    getPaymentBank,
} from './actions';

export class AboutUs extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        this.props.dispatch(getCareer());
        this.props.dispatch(getPaymentBank());
    }

    renderAboutUs = () => (
        <div>
            <span>ABOUT US</span><br />
            <span>We want you to be gorgeous with us.</span><br />
            <span>Women are from Venus, </span><br />
            <span>a representation of exceptional beauty.</span><br />
            <span>
                Their sweetness, grace, elegance...<br />
                An unrivaled charm that makes men weak in their knees before us.<br />
                We are already at our best even with an au naturel look, thus it is imperative that we care for our qualities carefully and preserve our youthful charm.
            </span><br />
            <img src="https://devshop2.hermo.my/hershop/modules/static/logo.png" alt="HERMO" /><br />
            <span>
                is the best Hero that understands our needs.<br />
                Meticulously selecting the best skin care and makeup products from around the world by a tireless team,<br />
                Hermo presents exactly what we need at a cost affordable price.
            </span>
            <br />
            <span>
                Round up a click at Hermo,<br />
                Get a quick inexpensive fix,<br />
                Experience your slick transformation,<br />
                Voila,
            </span>
            <br />
            <span>BEAUTY IN A CLICK</span><br />
            <span>
                On a mission to find beauty with you.<br />
                With Love, Hermo
            </span>
            <br />
            <hr />
        </div>
    )

    renderSellingPoint = () => (
        <div>
            <span>Shocking deals</span><br />
            <span>Passing savings onto you every day with regular promotions bound to surprise you and your friends. Flying off the racks each time, stay glued to Hermo and snatch your share of bounties.</span><br />
            <span>Trusted Since 2012</span><br />
            <span>Reviewed by all (bloggers, celebrities, and most importantly YOU), check out our Beauty Wall for the rave reviews. We love your feed-back more than anything, it&#39;s our journey together after all.</span><br />
            <span>100% Authentic Products</span><br />
            <span>With over 9,000 authentic products in stock - numbers steadily growing as you read this - you&#39;ll find almost anything here. If not, make a ruckus and we might just swim across Pacific to fulfill your heart&#39;s desire!</span><br />
            <span>14 Days Refundable</span><br />
            <span>Not satisfied with what your received? No question asked, enjoy our 14 days Unconditional Refund. Please read our Return Policy here</span>
            <span>FREE Flash Shipping Nationwide</span><br />
            <span>Get your order(s) in a flash at no extra cost! To qualify, just spend above the minimum purchase requirement: RM 50 for Peninsular Malaysia (WM) and RM 150 for Sabah & Sarawak (EM). Additional terms and conditions may apply - read our Shipping Policy HERE! </span><br />
            <ul><li>&#183;   For Shipping under FAQ, do suggest what kind of questions we should add so I can prepare copies accordingly. Let me know if you need clarifications. Thanks! :)</li></ul>
            <span>Hermo is Made in Malaysia</span><br />
            <span>Best of the Best of all, Hermo is handcrafted by Malaysians in Malaysia. Support “Made in Malaysia”, we strive to be a national pride as we continue to grow and expand onto an International platform!</span><br />
            <span>More than 10,000 trusted reviews</span><br />
            <span>Never trusted an online beauty store? Here at Hermo, you can count on us for your life&#39;s supply of the best cosmetic products. Check out our Product Reviews .</span><br />
            <hr />
        </div>
    )

    renderJoinUs = () => {
        if (!dataChecking(this.props, 'aboutUs', 'data', 'careerData')) {
            return null;
        }
        return (
            <div>
                <span>JOIN US</span>
                <span>#TeamHermo</span>
                <span>We&#39;re hiring. Come work at Malaysia&#39;s #1 beauty e-commerce site!</span>
                <span>
                    We’re a bunch of passionate & energetic internet people, and we don’t give up until we’ve made it.
                    So, when you join Hermo, you’re not joining a company of nameless faces you pass on the corridor, you’re choosing to be around
                    people who want the things you want.
                    People who have different skills to make that happen.
                    People whose energy and expertise you can feed off to make work that little bit more fun & making your career one full of impact.
                </span>
                <span>Whether you’re passionate about product, people, numbers, words, code, or strategy, we have a place for you.</span>
                <hr />
                {
                    this.props.aboutUs.data.careerData.items.map((item) => (
                        <Accordion
                            key={item.id}
                            height_threshold="220px"
                            contents={[
                                {
                                    key: item.id,
                                    title: item.name,
                                    description: item.content,
                                    togglable: true,
                                },
                            ]}
                        />
                    ))
                }
                <span>If this sounds like the work situation of your dreams, please email your resume/profile to hr@hermo.my. We can’t wait to meet you! Positions to be based full-time in Johor Bahru.</span>
                <hr />
            </div>
        );
    }

    renderPartnership = () => (
        <div>
            <span>PARTNERSHIPS</span><br />
            <span>Be Part of Our Revolution</span><br />
            <span>
                Are you a beauty product supplier, distributor or a beauty company?<br />
                We welcome you to establish a brand store here with us at Hermo!
            </span><br />
            <span>
                If you are a brand owner and is interested in collaborating with Hermo Group:<br />
            </span>
            <span>
                <i className="fa fa-envelope" aria-hidden="true"></i>
                EMAIL: brands@hermo.my
            </span><br />
            <span>For any marketing related enquiries, </span><br />
            <span>
                <i className="fa fa-envelope" aria-hidden="true"></i>
                EMAIL: marketing@hermo.my
            </span><br />
            <hr />
        </div>
    )

    renderCredit = () => (
        <div>
            <span>CREDITS</span><br />
            <span>Top 6 Tips to Get Hermo&#39;s Credits</span><br />
            <span>Hermo Credits let you shop till you drop at further, insane discount.</span><br />
            <span>
                Shop with your extra Hermo Credits now!<br />
                With Hermo Credits, you can get further discount when you shop in Hermo!
            </span><br />
            <span>Want to get unlimited credits? We will show you how!</span><br />
            <span>Use 100 credit exchange to RM 1, you can use up to 500 credits in 1 order!</span><br />
            <div>
                <img src="https://devshop2.hermo.my/hershop/modules/profile/credits/1.png" alt="" />
                <span>INVITE A FRIEND, GET GIFT VOUCHER</span><br />
                <span>
                    You will receive RM 15 GIFT VOUCHER<br />
                    after your friend succees their first purchase on HERMO
                </span><br />
                <img src="https://devshop2.hermo.my/hershop/modules/profile/credits/2.png" alt="" />
                <span>HELLO, MY HERMO!</span><br />
                <span>
                    Log in continuously for 10 days to earn 200 credits.<br />
                    Make sure you check your attendance/check in by clicking the above!
                </span><br />
                <img src="https://devshop2.hermo.my/hershop/modules/profile/credits/3.png" alt="" />
                <span>REVIEW YOUR PRODUCTS ON HERMO</span><br />
                <span>
                    20 CREDITS per approved product review
                </span><br />
                <img src="https://devshop2.hermo.my/hershop/modules/profile/credits/4.png" alt="" />
                <span>SHARE YOUR PRODUCTS ON INSTAGRAM</span><br />
                <span>
                    Upload, hashtag #hermomy, and 50 CREDITS is yours.
                </span><br />
                <img src="https://devshop2.hermo.my/hershop/modules/profile/credits/5.png" alt="" />
                <span>WANT MORE CREDITS? GET THEM NOW</span><br />
                <span>
                    Make a successful purchase on hermo.my<br />
                    EVERY RM 1 SPENT = 1 CREDIT
                </span><br />
                <img src="https://devshop2.hermo.my/hershop/modules/profile/credits/6.png" alt="" />
                <span>CONFIRM & REVIEW YOUR ORDER</span><br />
                <span>
                    20 FREE CREDITS earned easily. Like what??
                </span><br />
            </div>
            <hr />
        </div>
    )

    renderShipping = () => (
        <div>
            <span>SHIPPING</span>
            <span>Our Shipping Policy</span>
            <span>
                Currently, we only provide shipping to Singapore and Malaysia.
                Friends from Singapore can make your purchases through our Singapore official website - www.hermo.sg,
                Friends from Malaysia can make your purchases through our Malaysia official website - www.hermo.my.
            </span>
            <span>Delivery Fees</span>
            <ul>
                <li>HERMO delivers across Malaysia! The shipping rates are as follows:</li>
                <ol>
                    <li>Peninsular Malaysia: RM 6.80 per order</li>
                    <li>Sabah & Sarawak: RM 12 per order</li>
                </ol>
                <li>Enjoy FREE Shipping if you hit the minimum purchase amount (excluding Gift With Purchase (GWP), Beauty Grabs, X-OMO Deals) in a single order:</li>
                <ol>
                    <li>Peninsular Malaysia: RM 50</li>
                    <li>Sabah & Sarawak: RM 150</li>
                </ol>
                <li>Please note that this minimum spend is only applicable after discounts and vouchers have been applied.</li>
            </ul>
            <span>Delivery Fees for HERMO Global</span>
            <ul>
                <li>Products sold under HERMO Global are shipped directly by our international suppliers.</li>
                <li>Free Shipping is available for orders above RM 150 nett. For orders below RM 150, the following fees apply:</li>
                <ol>
                    <li>Peninsular Malaysia: RM 8 per order</li>
                    <li>Sabah & Sarawak: RM 13 per order</li>
                </ol>
                <li>For HERMO Global products, customs fees and import duties are included in the displayed prices. For more details, feel free to contact our Customer Service team.</li>
            </ul>
            <span>Additional Information</span>
            <ul>
                <li>Kindly ensure your shipping address is accurate, as we don’t allow amendments after your order number is generated.</li>
                <li>Our courier service providers are GDex, Pos Laju, and DHL eCommerce.</li>
                <li>We are unable to deliver to P.O. Box addresses. For university/college campus addresses, your orders can only be delivered to the administration office or mail room.</li>
                <li>For orders with HERMO and HERMO Global products, items will be delivered separately by HERMO and our international supplier(s) respectively.</li>
                <li>For orders with HERMO and HERMO Global products, but only the HERMO purchase meets the Free Shipping requirement, shipping fee will be charged for your HERMO Global purchase.</li>
            </ul>
            <span>
                Your parcels are delivered using the following courier services DHL eCommerce/GDEX/GDEX COD/J&T Express /Motorex/Poslaju
                Currently we only available to ship to Peninsular Malaysia, Sabah and Sarawak.
                All addresses are unable to make any adjustment once already in processing. (unless special case)
            </span>
            <span>Self-Collect</span>
            <span>You can choose to collect your purchases at Hermo’s Office, located in Johor Bahru, Johor.</span>
            <span>
                Setia Business Park 2,
                28, Jalan Perniagaan Setia 1/5,
                Taman Perniagaan Setia,
                81100, Johor bahru, Johor.
            </span>
            <span>Please contact 07-5623567 or admin@hermo.my for further information and please provide your order details .</span>
            <span>Delivery Time</span>
            <span>
                We try our best to prepare your orders and send them out as soon as we can but orders can only be shipped during working days and hours. We hope our beloved customers might note that
                HERMO does not represent courier companies, and as much as we hope for parcels to arrive on time, parcels can suffer delays beyond our control. However, please rest assured we&#39;re on
                your side and will help in any way we can.
            </span>
            <span>Office Hours are from Monday to Friday, excluding Public Holidays.</span>
            <span>During Promotion Periods</span>
            <span>
                During peak periods, there may be some delay in shipping. Please bear with us as we could not fulfil the usual next day delivery promise due to large volume of orders, transaction and
                availability issues.
            </span>
            <span>
                For more details or inquiries on shipping issues,
                Please contact us at: 07-5623567 or admin@hermo.my
            </span>
            <hr />
        </div>
    )

    render() {
        console.log(this.props);
        return (
            <div>
                {this.renderAboutUs()}
                {this.renderSellingPoint()}
                {this.renderJoinUs()}
                {this.renderPartnership()}
                {this.renderCredit()}
                {this.renderShipping()}
            </div>
        );
    }
}

AboutUs.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    aboutUs: makeSelectAboutUs(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'aboutUs', reducer });
const withSaga = injectSaga({ key: 'aboutUs', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(AboutUs);

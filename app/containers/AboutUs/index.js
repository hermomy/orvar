/**
 *
 * AboutUs
 * author: lee wang lin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { dataChecking } from 'globalUtils';
import { NavLink } from 'react-router-dom';
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
    state = {
        dataWantToView: null,
    }

    componentWillMount() {
        this.props.dispatch(getCareer());
        this.props.dispatch(getPaymentBank());

        this.setState({ dataWantToView: this.props.match.params.abouthermo });
    }

    renderSidebar = () => (
        <div>
            <span className="aboutus-sidebar-title">WHO ARE WE</span><br />
            <span onClick={() => this.setState({ dataWantToView: null })} className={`${!this.state.dataWantToView ? 'aboutus-clicked-sidebar' : ''}`}>About Us</span><br />
            <span onClick={() => this.setState({ dataWantToView: 'joinus' })} className={`${this.state.dataWantToView === 'joinus' ? 'aboutus-clicked-sidebar' : ''}`}>Join Us</span><br />
            <span onClick={() => this.setState({ dataWantToView: 'partnership' })} className={`${this.state.dataWantToView === 'partnership' ? 'aboutus-clicked-sidebar' : ''}`}>Partnership</span><br />
            <span className="aboutus-sidebar-title">SHOPPING GUIDE</span><br />
            <span onClick={() => this.setState({ dataWantToView: 'credit' })} className={`${this.state.dataWantToView === 'credit' ? 'aboutus-clicked-sidebar' : ''}`}>Credits</span><br />
            <span onClick={() => this.setState({ dataWantToView: 'shippinginfo' })} className={`${this.state.dataWantToView === 'shippinginfo' ? 'aboutus-clicked-sidebar' : ''}`}>Shipping</span><br />
            <span onClick={() => this.setState({ dataWantToView: 'returnpolicy' })} className={`${this.state.dataWantToView === 'returnpolicy' ? 'aboutus-clicked-sidebar' : ''}`}>Return Policy</span><br />
            <span onClick={() => this.setState({ dataWantToView: 'membership' })} className={`${this.state.dataWantToView === 'membership' ? 'aboutus-clicked-sidebar' : ''}`}>Membership</span><br />
            <span onClick={() => this.setState({ dataWantToView: 'contactus' })} className={`${this.state.dataWantToView === 'contactus' ? 'aboutus-clicked-sidebar' : ''}`}>Contact Us</span><br />
            <span className="aboutus-sidebar-title">TERMS</span><br />
            <span onClick={() => this.setState({ dataWantToView: 'privacypolicy' })} className={`${this.state.dataWantToView === 'privacypolicy' ? 'aboutus-clicked-sidebar' : ''}`}>Privacy Policy</span><br />
            <span onClick={() => this.setState({ dataWantToView: 'userterm' })} className={`${this.state.dataWantToView === 'userterm' ? 'aboutus-clicked-sidebar' : ''}`}>User Term</span><br />
            <span onClick={() => this.setState({ dataWantToView: 'faq' })} className={`${this.state.dataWantToView === 'faq' ? 'aboutus-clicked-sidebar' : ''}`}>FAQ</span><br />
            <br />
        </div>
    )

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
            <span>Reviewed by all (bloggers, celebrities, and most importantly YOU), check out our <a href="https://www.youtube.com/watch?v=_SxKO-tVfkc">Beauty Wall</a> for the rave reviews. We love your feed-back more than anything, it&#39;s our journey together after all.</span><br />
            <span>100% Authentic Products</span><br />
            <span>With over 9,000 authentic products in stock - numbers steadily growing as you read this - you&#39;ll find almost anything here. If not, make a ruckus and we might just swim across Pacific to fulfill your heart&#39;s desire!</span><br />
            <span>14 Days Refundable</span><br />
            <span>Not satisfied with what your received? No question asked, enjoy our 14 days Unconditional Refund. Please read our <a href="#returnPolicy">Return Policy</a> here</span>
            <span>FREE Flash Shipping Nationwide</span><br />
            <span>Get your order(s) in a flash at no extra cost! To qualify, just spend above the minimum purchase requirement: RM 50 for Peninsular Malaysia (WM) and RM 150 for Sabah & Sarawak (EM). Additional terms and conditions may apply - read our Shipping Policy HERE! </span><br />
            <ul><li>&#183;   For Shipping under FAQ, do suggest what kind of questions we should add so I can prepare copies accordingly. Let me know if you need clarifications. Thanks! :)</li></ul>
            <span>Hermo is Made in Malaysia</span><br />
            <span>Best of the Best of all, Hermo is handcrafted by Malaysians in Malaysia. Support “Made in Malaysia”, we strive to be a national pride as we continue to grow and expand onto an International platform!</span><br />
            <span>More than 10,000 trusted reviews</span><br />
            <span>Never trusted an online beauty store? Here at Hermo, you can count on us for your life&#39;s supply of the best cosmetic products. Check out our <NavLink to={'/mall'}>Product Reviews</NavLink> .</span><br />
            <hr />
        </div>
    )

    renderJoinUs = () => {
        if (!dataChecking(this.props, 'aboutUs', 'data', 'careerData')) {
            return null;
        }
        return (
            <div>
                <span>JOIN US</span><br />
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
                <div>
                    <span>Join Hermo Family</span>
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
                </div>
                <span>If this sounds like the work situation of your dreams, please email your resume/profile to <a href="mailto:hr@hermo.my">hr@hermo.my</a>. We can’t wait to meet you! Positions to be based full-time in Johor Bahru.</span>
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
                EMAIL: <a href="mailto:brands@hermo.my">brands@hermo.my</a>
            </span><br />
            <span>For any marketing related enquiries, </span><br />
            <span>
                <i className="fa fa-envelope" aria-hidden="true"></i>
                EMAIL: <a href="mailto:marketing@hermo.my">marketing@hermo.my</a>
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
            <span>SHIPPING</span><br />
            <span>Our Shipping Policy</span><br />
            <span>
                Currently, we only provide shipping to Singapore and Malaysia.<br />
                Friends from Singapore can make your purchases through our Singapore official website - www.hermo.sg,<br />
                Friends from Malaysia can make your purchases through our Malaysia official website - www.hermo.my.
            </span><br />
            <span>Delivery Fees</span><br />
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
                <li>Kindly ensure your shipping address is accurate, as we don’t allow amendments after your order number is generated.</li><br />
                <li>Our courier service providers are GDex, Pos Laju, and DHL eCommerce.</li><br />
                <li>We are unable to deliver to P.O. Box addresses. For university/college campus addresses, your orders can only be delivered to the administration office or mail room.</li><br />
                <li>For orders with HERMO and HERMO Global products, items will be delivered separately by HERMO and our international supplier(s) respectively.</li><br />
                <li>For orders with HERMO and HERMO Global products, but only the HERMO purchase meets the Free Shipping requirement, shipping fee will be charged for your HERMO Global purchase.</li><br />
            </ul>
            <span>
                Your parcels are delivered using the following courier services DHL eCommerce/GDEX/GDEX COD/J&T Express /Motorex/Poslaju<br />
                Currently we only available to ship to Peninsular Malaysia, Sabah and Sarawak.<br />
                All addresses are unable to make any adjustment once already in processing. (unless special case)
            </span><br />
            <span>Self-Collect</span><br />
            <span>You can choose to collect your purchases at Hermo’s Office, located in Johor Bahru, Johor.</span><br />
            <span>
                Setia Business Park 2,<br />
                28, Jalan Perniagaan Setia 1/5,<br />
                Taman Perniagaan Setia,<br />
                81100, Johor bahru, Johor.
            </span><br />
            <span>Please contact <a href="tel:07-5623567">07-5623567</a> or <a href="mailto:admin@hermo.my">admin@hermo.my</a>admin@hermo.my for further information and please provide your order details .</span><br />
            <span>Delivery Time</span><br />
            <span>
                We try our best to prepare your orders and send them out as soon as we can but orders can only be shipped during working days and hours. We hope our beloved customers might note that<br />
                HERMO does not represent courier companies, and as much as we hope for parcels to arrive on time, parcels can suffer delays beyond our control. However, please rest assured we&#39;re on<br />
                your side and will help in any way we can.
            </span><br />
            <span>Office Hours are from Monday to Friday, excluding Public Holidays.</span><br />
            <span>During Promotion Periods</span><br />
            <span>
                During peak periods, there may be some delay in shipping. Please bear with us as we could not fulfil the usual next day delivery promise due to large volume of orders, transaction and<br />
                availability issues.
            </span><br />
            <span>
                For more details or inquiries on shipping issues,<br />
                Please contact us at: <a href="tel:07-5623567">07-5623567</a> or <a href="mailto:admin@hermo.my">admin@hermo.my</a>
            </span><br />
            <hr />
        </div>
    )

    renderReturnPolicy = () => (
        <div>
            <span>RETURN POLICY</span><br />
            <span>Unconditional Return Policy</span><br />
            <span>If you are not satisfied with your purchase (damaged during shipment or wrong item/type/shade/etc), you can send it back to us.</span><br />
            <ul>
                <li>Returns must be made within 14 days from date of purchase.</li><br />
                <li>Damaged items must be returned together with their original box and receipt.</li><br />
                <li>Items bought from Hermo Global or promotional events (e.g. Anniversary, MyCyberSale or X&#39;MAS) are not eligible for return and exchange.</li><br />
            </ul>
            <span>
                Kindly inform Customer Service before returning the item otherwise the request will not be processed.<br />
                Your return item will be assigned to a courier of our choosing.<br />
                Please provide the return parcel tracking number for all items.
            </span><br />
            <span>What will I get back after returning the item(s)?</span><br />
            <span>You can choose to have either a prorated refund ( if order has applied promotion code ) to your Hermo Account or bank account ( within 1-14 working days)</span><br />
            <span>What about postage charges?</span><br />
            <span>
                Customers would have to bear the postage fees for shipping item(s) back to us during the return process,<br />
                then we will refund a maximum of RM 5.00 for your return shipping charges to your account.<br />
                Please allow 14 working days for this process to be completed.<br />
                For more information, kindly email to <a href="mailto:admin@hermo.my">admin@hermo.my</a><br />
            </span>
            <span>How can I return my purchase?</span><br />
            <span>
                Kindly email your inquiry to admin@hermo.my with the subject “Return Item”. We will assist you as soon as possible.<br />
                Please allow 7 working days for your inquiry to be processed.<br />
                To make the process run smoother and faster, do email your inquiry with picture(s) of your item(s) & its condition and your order details for record purpose.<br />
            </span>
            <span>How long will it take to receive my refund/new item(s)?</span><br />
            <span>
                Please allow a minimum of 14 working days from the date we receive your return package.<br />
                Refund will based on customer actual paid - Final payment to refund, voucher cannot change into cash term
            </span><br />
            <span>I need more information about this. Who do I contact?</span><br />
            <span>
                You can contact our customer service at <a href="tel:07-5623567">07-5623567</a>  or email your inquiry to <a href="mailto:admin@hermo.my">admin@hermo.my</a><br />
                Our customer service will contact you during working days and hours.<br />
            </span>
            <hr />
        </div>
    )

    renderMembership = () => (
        <div>
            <span>MEMBERSHIP</span><br />
            <span>VIP Level & Privileges</span><br />
            <img src="https://devshop2.hermo.my/hershop/modules/static/privilege.jpg" alt="" />
            <span>MEMBERSHIP</span><br />
            <hr />
            <span>GOLD & PLATINUM MEMBERSHIP</span><br />
            <span>Thank you for your continuous support! You mean so much to us.</span><br />
            <div>
                <div>
                    <span>GOLD MEMBER</span>
                    <img src="https://devshop2.hermo.my/hershop/modules/static/15.png" alt="" />
                    <span>ENJOY</span>
                    <span>1.5%OFF</span>
                    <span>EVERYTIME CHECKOUT</span>
                    <span>Awarded to who spends more than RM 1000 in HERMO</span>
                </div>
                <div>
                    <span>PLATINUM MEMBER</span>
                    <img src="https://devshop2.hermo.my/hershop/modules/static/30.png" alt="" />
                    <span>ENJOY</span>
                    <span>3.0%OFF</span>
                    <span>EVERYTIME CHECKOUT</span>
                    <span>Awarded to who spends more than RM 2000 in HERMO</span>
                </div>
            </div>
            <span>
                Whenever you have reached a certain total expenditure on our website, we will automatically upgrade your account to Gold Member or Platinum Member. With the exclusive membership,<br />
                you can enjoy further discounts when you are shopping with us and you can even unlock different kinds of new features on our new website!
            </span><br />
            <span>What are you still waiting for? Come and experience it!</span><br />
            <span>Privilege discounts are not valid for use during event period and not applicable when a promotion/voucher code has been applied to an order. T&C apply.</span><br />
            <hr />
        </div>
    )

    renderContactUs = () => (
        <div>
            <span>CONTACT US</span><br />
            <span>We want your experience with Hermo to be worry-free.</span><br />
            <span>Please contact us if you have any questions or encountered any problems when shopping at Hermo.</span><br />
            <span>YOU CAN CONTACT US VIA:</span><br />
            <span><i className="fa fa-envelope" aria-hidden="true"></i>EMAIL: <a href="mailto:admin@hermo.my">admin@hermo.my</a></span><br />
            <span>We will reply to your inquiry within 48 working hours.</span><br />
            <span><i className="fa fa-phone" aria-hidden="true"></i>PHONE: <a href="tel:07-5623567">07-5623567</a></span><br />
            <span>Mon - fri (except public holiday) 9.00AM - 6.00PM </span><br />
            <span>(UTC +08:00) Malaysia Time</span><br />
            <span><i className="fa fa-map-marker" aria-hidden="true"></i>ADDRESS</span><br />
            <span>
                Setia Business Park 2,<br />
                28, Jalan Perniagaan Setia 1/5,<br />
                Taman Perniagaan Setia,<br />
                81100, Johor bahru, Johor.
            </span><br />
            <span>Follow our journey to beauty daily</span><br />
            <span><a href="https://www.facebook.com/HermoMalaysia">FACEBOOK ICON</a></span>
            <span><a href="mailto:admin@hermo.my">ADMIN ICON</a></span>
            <span><a href="https://www.instagram.com/hermomy/">INSTAGRAM ICON</a></span>
            <hr />
        </div>
    )

    renderPrivacyPolicy = () => (
        <div>
            <span>PRIVACY POLICY</span><br />
            <span>
                At Hermo MY, we take your privacy seriously! Please read this Statement of Privacy to be more aware about our policy on collecting, using and disclosing personal information. Hermo MY<br />
                occasionally update this Statement of Privacy to reflect company and user’s feedback. We encourage you to review this Statement periodically to be informed of how we are protecting your<br />
                personal information.
            </span><br />
            <span>Privacy Statement</span><br />
            <span>Hermo MY treats personal information, such as your name, email address or telephone number as confidential. We promise your personal information will not be disclosed to any third parties. We will not use or sell your personal information to third party unless:</span><br />
            <ul>
                <li>Users agreed to share with third party;</li><br />
                <li>Users make known to public of their personal information voluntarily and willingly in order to enjoy products or services;</li><br />
                <li>Violation of Hermo MY&#39;s Terms of Use, or as otherwise required by the law.</li><br />
            </ul>
            <span>Instructions For Use</span><br />
            <span>
                Hermo MY is committed to protecting the security of your personal information. We use password set up by users to help protect your personal information from unauthorized access, use,<br />
                or disclosure. Users are fully responsible for protecting their password. If users are using public computer, please logout before leaving to prevent disclosure of personal information.
            </span><br />
            <span>Terms</span><br />
            <span>
                By using this site and providing information as a registered user, you are in agreement with our privacy policy. We are not responsible for the breach of our privacy statement or other<br />
                contents on websites outside the Hermo MY domain name.
            </span><br />
            <hr />
        </div>
    )

    renderUserTerm = () => (
        <div>
            <span>USER TERM</span><br />
            <span>
                Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our<br />
                privacy policy govern Hermo’s relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.
            </span><br />
            <span>The term &#39;Hermo&#39; or ‘us’ or ‘we’ refers to the owner of the website. The term ‘you’ refers to the user or viewer of our <website className=""></website></span><br />
            <span>The use of this website is subject to the following terms of use:</span><br />
            <ul>
                <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li><br />
                <li>This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties.</li><br />
                <li>
                    Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found<br />
                    or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for<br />
                    any such inaccuracies or errors to the fullest extent permitted by law.
                </li><br />
                <li>
                    Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products,<br />
                    services or information available through this website meet your specific requirements.
                </li><br />
                <li>
                    This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is<br />
                    prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                </li><br />
                <li>All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.</li><br />
                <li>Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.</li><br />
                <li>
                    From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse<br />
                    the website(s). We have no responsibility for the content of the linked website(s).
                </li><br />
                <li>Your use of this website and any dispute arising out of such use of the website is subject to the laws of Malaysia.</li><br />
            </ul>
            <span>Website Disclaimer</span>
            <span>
                The information contained in this website is for general information purposes only. The information is provided by Hermo and while we endeavour to keep the information up to date and correct,<br />
                we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information,<br />
                products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
            </span><br />
            <span>
                In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or<br />
                profits arising out of, or in connection with, the use of this website.
            </span><br />
            <span>
                Through this website you are able to link to other websites which are not under the control of Hermo. We have no control over the nature, content and availability of those sites. The inclusion<br />
                of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </span><br />
            <span>
                Every effort is made to keep the website up and running smoothly. However, Hermo takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to<br />
                technical issues beyond our control.
            </span><br />
            <hr />
        </div>
    )

    renderFAQ = () => (
        <div>
            <span>FAQ</span><br />
            <span>How Can We Help You?</span><br />
            <span>GENERAL</span><br />
            <ul>
                <a href="#general1"><li>What is Hermo? How does Hermo work?</li></a><br />
                <a href="#general2"><li>Help! I don’t know how to buy things online.</li></a><br />
            </ul>
            <span>PAYMENT</span><br />
            <ul>
                <a href="#payment1"><li>How to make payment?</li></a><br />
                <a href="#payment1"><li>What if I can’t make payment online?</li></a><br />
            </ul>
            <span>SHIPPING</span><br />
            <ul>
                <a href="#shipping1"><li>How much is your delivery fees?</li></a><br />
                <a href="#shipping2"><li>When will I receive my purchase?</li></a><br />
                <a href="#shipping3"><li>Can I just buy 2 Beauty Grab’s items and get free shipping?</li></a><br />
            </ul>
            <span>ORDER</span><br />
            <ul>
                <a href="#order1"><li>How can I check the status of my order(s)?</li></a><br />
                <a href="#order2"><li>What will I get back after returning the item(s) or order item is out of stock?</li></a><br />
                <a href="#order3"><li>Why is the item in my shopping cart out of stock?</li></a><br />
                <a href="#order4"><li>What can I do if I fail to checkout due to an item being out of stock?</li></a><br />
            </ul>
            <span>RETURN</span><br />
            <ul>
                <a href="#return1"><li>How do I return an item?</li></a><br />
            </ul>
            <span>PROMOTIONS</span><br />
            <ul>
                <a href="#promotion1"><li>Do you offer free samples?</li></a><br />
                <a href="#promotion2"><li>What is gift with purchase (GWP)?</li></a><br />
                <a href="#promotion3"><li>Are the products offered at Hermo original since we get so much discount?</li></a><br />
                <a href="#promotion4"><li>Why is my order cancelled?</li></a><br />
            </ul>
            <span>CREDITS</span><br />
            <ul>
                <a href="#credit1"><li>Can I post 3 photos of 1 photo on my Instagram and get 150 credits?</li></a><br />
                <a href="#credit2"><li>Are my credits transferable to cash?</li></a><br />
            </ul>
            <span>PARTNERSHIP</span><br />
            <ul>
                <a href="#partnership1"><li>How can we sell on Hermo?</li></a><br />
            </ul>
        </div>
    )

    renderFAQGeneral = () => (
        <div>
            <span>GENERAL</span><br />
            <hr />
            <span>What is Hermo? How does Hermo work?</span><br />
            <span>
                Hermo MY is an online beauty shop - a beauty collection, - whose mission is to bring gorgeousness straight to you by offering your favourite beauty products from across Asia. There are<br />
                thousands of people who choose to buy their skincare and beauty products online, but what makes us different? Our aim is to make your shopping experience simple and affordable, with<br />
                the best range of brands available. Hermo is where you discover beauty products offered at shocking prices and share your beauty tips with friends.
            </span><br />
            <span>
                We are certified partners and distributors of the brands we carry so you&#39;ll only get 100% Authentic products delivered to you. As we are an online beauty store with no physical shops and<br />
                overheads, you know we are passing great savings on to you, ensuring that you are offered only the best value in the comfort of your home!
            </span><br />
            <span>Help! I don’t know how to buy things online.</span><br />
            <span>Here we will show you a quick and simple guide of steps from register till make payment.</span><br />
            <ol>
                <li>Register an account as a user at www.hermo.my</li><br />
                <li>Shopping in the website</li><br />
                <li>Add to cart the desire item(s)</li><br />
                <li>Check out the shopping cart</li><br />
                <li>Check the desired item quantity or other detail</li><br />
                <li>Click “Checkout now” for your shopping cart</li><br />
                <li>Fill up shipping information and click “Add new address”</li><br />
                <li>Choose for courier arrangement</li><br />
                <li>Choose the payment method</li><br />
                <li>Apply if ANY promotion/voucher code OR credits OR balance</li><br />
                <li>Check out order</li><br />
                <li>Get the order ID</li><br />
                <li>Make payment</li><br />
                <li>Inform payment thru call/email/FB inbox</li><br />
            </ol>
        </div>
    )

    renderFAQPayment = () => {
        if (!dataChecking(this.props, 'aboutUs', 'data', 'paymentBankData')) {
            return null;
        }
        return (
            <div>
                <span>PAYMENT</span><br />
                <hr />
                <span>How to make payment?</span><br />
                <span>
                    Hermo MY supports MOL Pay Gateway currently is the best, safest and award-winning online payment gateway that facilitates online merchants or e-commerce merchants&#39; online store in<br />
                    Malaysia to process online transactions in Ringgit Malaysia currency ( MYR ) in large extent and securely.You will only see the payment page after clicked ‘check out’ button. MOL Pay accepts<br />
                    comprehensive of Online Payment Options such as:
                </span><br />
                <span>What if I can&#39;t make payment online?</span><br />
                <span>You can choose &#39;&#39;Manual Transfer&#39;&#39; when you check out. Then, send an email to <a href="mailto:admin@hermo.my">admin@hermo.my</a> to inform regarding your successful payment. Payment details must provide and order ID.</span><br />
                {
                    this.props.aboutUs.data.paymentBankData.map((bankData) => (
                        <div key={bankData.id}>
                            <span>Bank Name : {bankData.name}</span>
                            <span>Account Name : {bankData.account_holder}</span>
                            <span>Account No. : {bankData.account_number}</span>
                        </div>
                    ))
                }
            </div>
        );
    }

    renderFAQShipping = () => (
        <div>
            <span>SHIPPING</span>
            <hr />
            <span>How much is your delivery fees?</span><br />
            <span>Shipping fee calculation is as below :</span><br />
            <span>
                West Malaysia - RM 6.80 for all courier service for single item purchased except Taqbin.<br />
                East Malaysia - RM 12 for Poslaju courier service. Free shipping available if you spend RM 150 and above in a single receipt.
            </span><br />
            <span>
                We now also provide TaQBin service for those who want to receive their purchase over the weekends or holidays. A flat rate of RM 10 shipping fee is applicable in order to use this awesome<br />
                Japanese courier service. TaQBin is only available in West Malaysia certain area as they have yet to expand their services to regions in East Malaysia.
            </span><br />
            <span>When will I receive my purchase?</span><br />
            <span>
                Our customers call it &#39;&#39;Flash Shipping&#39;&#39;!<br />
                Hermo aims to deliver within the time agreed upon when you checkout. Under normal circumstance, you will be able to receive your purchase within 1-3 working days.
            </span><br />
            <span>
                However, we are unable to guarantee that all orders will be delivered within the stipulated time frame. Our aim is to have your items shipped out from our warehouse as fast as possible<br />
                except for some circumstances where unfortunately it is beyond our control for example courier service delays, emergency, or items out of stock.
            </span><br />
            <span>Please do not hesitate to contact us for help via email: <a href="mailto:admin@hermo.my">admin@hermo.my</a>.</span><br />
            <span>Can I buy 2 Beauty Grab’s items and get free shipping?</span><br />
            <span>No, Beauty Grab items not entitled for FREE shipping.</span><br />
        </div>
    )

    renderFAQOrder = () => (
        <div>
            <span>ORDER</span><br />
            <hr />
            <span>How can I check the status of my order(s)?</span><br />
            <span>Please check in &#39;&#39;Order&#39;&#39;. After your order is posted out, your Order status will change from &#39;&#39;Paid&#39;&#39; to &#39;&#39;Posted&#39;&#39; with a courier company tracking number attached. ( with link )</span><br />
            <span>What will I get back after returning the item(s) or order item is out of stock?</span><br />
            <span>You can choose to have either a prorated refund ( if promotion code has been applied to order ) to your Hermo Account or bank account ( within 1-14 working days)</span><br />
            <span>Why is the item in my shopping cart out of stock?</span><br />
            <span>Hermo will not guarantee the availability of items until the checkout process is completed with payment.</span><br />
            <span>What can I do if I fail to checkout due to an item being out of stock?</span><br />
            <span>You will have to remove the out of stock items from your cart before proceeding to check out.</span><br />
        </div>
    )

    renderFAQReturn = () => (
        <div>
            <span>RETURN</span>
            <hr />
            <span>How do I return an item?</span><br />
            <span>We want you to absolutely love your Hermo purchase. If you&#39;d like to return or exchange an item, we will do everything we can (within reason) on this journey to gorgeousness together!</span><br />
            <span>Please e-mail us a Refund Application Form in the following format:</span><br />
            <span>
                Name: HERMO Account Username<br />
                Register email:<br />
                Address:<br />
                Contact No.: Telephone / Mobile<br />
                Order No.:<br />
                Product Name:<br />
                Receive Date:<br />
                Return Date:<br />
                Reason: (For feedback purposes)<br />
                Price:<br />
                Postage/Mailing Cost: (Please attach a copy of postag receipt/document<br />
                Bank account details (full name/bank account number/which bank)<br />
            </span>
            <span>
                Once you have completed the form, please email it to us at admin@hermo.my. If you have any difficulties or problems, please do not hesitate to contact us at 07-5623567 . Our administrator<br />
                will contact you once your request is confirmed, and then we will refund to you within 1 -14 working days.
            </span><br />
        </div>
    )

    renderFAQPromotion = () => (
        <div>
            <span>PROMOTION</span>
            <hr />
            <span>Do you offer free samples?</span><br />
            <span>Yes. All our free samples are supplied by our supplier, we will giving to our customer free sample while stock last .</span><br />
            <span>What is gift with purchase (GWP)?</span><br />
            <span>
                Gift With Purchase it’s actually a way to try a new product that provided by our supplier , it’s limited in stock , therefore kindly add your GWP before your check out. Items featured in Beauty<br />
                Bundle Box, Hermo Pick, and Beauty Grab are not entitled for free gift redemption with their purchases.
            </span><br />
            <span>Are the products offered at Hermo original since we get so much discount?</span><br />
            <span>
                Yes! At Hermo MY, we promise you that every product that are being group sold is 100% authentic. Providing you with the highest quality service and original goods is our top priority. Beauty<br />
                products for you at low prices with many great deals you will love! Also, we are able to pass on the savings to you since we do not have a physical storefront and related overhead expenses.<br />
                :)
            </span><br />
            <span>Why is my order cancelled?</span><br />
            <span>
                Hermo reserves the right to cancel or modify any order if a customer’s purchase behaviour is seen to be suspicious or potentially fraudulent. If you have an enquiries, kindly contact our<br />
                Customer Service via <a href="mailto:admin@hermo.my">admin@hermo.my</a>.
            </span><br />
        </div>
    )

    renderFAQCredit = () => (
        <div>
            <span>CREDIT</span>
            <hr />
            <span>Can I post 3 photos of 1 photo on my Instagram and get 150 credits?</span><br />
            <span>No. One order only can redeem one instagram credit .</span><br />
            <span>Are my credits transferable to cash?</span><br />
            <span>No. All the voucher cannot transfer to cash or credits.</span><br />
        </div>
    )

    renderFAQPartnership = () => (
        <div>
            <span>PARTNERSHIP</span><br />
            <hr />
            <span>How can we sell on Hermo?</span><br />
            <span>
                We are always on the lookout for beauty suppliers and brand corporations.<br />
                Please write to us at <a href="mailto:marketing@hermo.my">marketing@hermo.my</a> , our team member will respond to you as soon as possible.
            </span><br />
        </div>
    )

    render() {
        return (
            <div>
                {this.renderSidebar()}
                {!this.state.dataWantToView ? this.renderAboutUs() : null}
                {!this.state.dataWantToView ? this.renderSellingPoint() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'joinus' ? this.renderJoinUs() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'partnership' ? this.renderPartnership() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'credit' ? this.renderCredit() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'shippinginfo' ? this.renderShipping() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'returnpolicy' ? this.renderReturnPolicy() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'membership' ? this.renderMembership() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'contactus' ? this.renderContactUs() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'privacypolicy' ? this.renderPrivacyPolicy() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'userterm' ? this.renderUserTerm() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'faq' ? this.renderFAQ() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'faq' ? this.renderFAQGeneral() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'faq' || this.state.dataWantToView === 'hermobankaccount' ? this.renderFAQPayment() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'faq' ? this.renderFAQShipping() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'faq' ? this.renderFAQOrder() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'faq' ? this.renderFAQReturn() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'faq' ? this.renderFAQPromotion() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'faq' ? this.renderFAQCredit() : null}
                {!this.state.dataWantToView || this.state.dataWantToView === 'faq' ? this.renderFAQPartnership() : null}
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

import React, { useState } from "react";

import { graphql, Link } from "gatsby";
import { RichText } from "prismic-reactjs";
import linkResolver from "../utils/linkResolver";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Slider from "material-ui/Slider";
import SEO from "../components/seo";
import last from "lodash/last";
import pricingPoints from "../utils/pricingPoints";
import { withPreview } from "gatsby-source-prismic";

import Layout from "../components/layout";
import SectionDemo from "../components/sectionDemo";

import "../style/scss/pricing.scss";

// const FaqElement = ({ question, answer }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <li onClick={() => setOpen(!open)} className={open && 'style-open'}>
//       <div className="head">
//         <div className="text">{RichText.asText(question.raw)}</div>
//         <div className="action">
//           <div className="line"></div>
//           <div className="line"></div>
//         </div>
//       </div>
//       <p>{RichText.asText(answer.raw)}</p>
//     </li>
//   );
// };

const minPackages = 0;
const maxPackages = 30000;
const power = 6;
const minStarter = 99;
const minPro = 399;
const dollarMultiple = 1.1;
const sdeMultiple = 0.25;
const feedbackMultiple = 0.35;

const transform = (value) =>
  Math.round(
    ((Math.exp((power * value) / maxPackages) - 1) / (Math.exp(power) - 1)) *
      maxPackages
  );

const reverse = (value) =>
  (1 / power) *
  Math.log(((Math.exp(power) - 1) * value) / maxPackages + 1) *
  maxPackages;

const packageBasePrice = (packages) => {
  const priceSteps = Object.keys(pricingPoints);
  if (packages <= priceSteps[0]) {
    return 24;
  } else if (packages > last(priceSteps)) {
    return pricingPoints[last(priceSteps)];
  }

  const currentStep = last(priceSteps.filter((s) => packages >= s));
  return pricingPoints[currentStep];
};

const Pricing = ({ data }) => {
  const [packages, setPackages] = useState(1000);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const toggleIsCurrencyDropdownOpen = () => {
    setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
  };
  const [currencyEur, setCurrencyEur] = useState(true);
  const currencySymbol = currencyEur ? "EUR" : "USD";
  const { lang, uid, data: prismicContent } = data.prismicPricing;
  if (!prismicContent) return null;

  const getPricing = (packages) => {
    const basePrice = packageBasePrice(packages);
    const currencyMultiple = currencyEur ? 1 : dollarMultiple;
    return (basePrice * currencyMultiple) / 100.0;
  };

  const formatPrice = (price, maximumFractionDigits = 0) =>
    new Intl.NumberFormat(lang, {
      style: "currency",
      currency: currencySymbol,
      maximumFractionDigits,
      minimumFractionDigits: 0,
    }).format(price);

  const handleInputChange = (event) => {
    let packages = 0;
    try {
      packages = Math.min(
        parseInt(event.target.value.replace(" ", ""), 10),
        maxPackages
      );
    } catch (e) {
      console.error(e);
    }
    setPackages(packages || 0);
  };

  const pricing = getPricing(packages);

  return (
    <MuiThemeProvider>
      <Layout classHeader="style-black" lang={lang} uid={uid}>
        <SEO
          title={RichText.asText(prismicContent.prismic_name.raw)}
          lang={lang}
        />
        <section className="section-cover">
          <div className="wrapper">
            <img className="obj-1" src="/img/3a-pricing/obj-1.svg" alt="" />
            <img className="obj-2" src="/img/3a-pricing/obj-2.svg" alt="" />
            <div className="container-title">
              <h1>{RichText.asText(prismicContent.title.raw)}</h1>
              <p>{RichText.asText(prismicContent.sub_title.raw)}</p>
            </div>
            <div className="container-range">
              <Slider
                min={minPackages}
                max={maxPackages}
                value={reverse(packages)}
                onChange={(_event, value) => setPackages(transform(value))}
                step={1}
                className="pricing-slider"
                disableFocusRipple
              />
              <div className="container-package">
                <img
                  className="icn"
                  src="/img/3a-pricing/icn-package.svg"
                  alt=""
                />
                <input
                  type="text"
                  value={packages
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                  onChange={handleInputChange}
                  className="number"
                />
                <div className="text">
                  <span>
                    {RichText.asText(prismicContent.packages_bold.raw)}
                  </span>
                  <span>
                    {RichText.asText(prismicContent.per_month_normal.raw)}
                  </span>
                </div>
              </div>
            </div>
            <div className="container-currency-dropdown">
              <div
                className="currency-dropdown"
                onClick={toggleIsCurrencyDropdownOpen}
              >
                <div className="currency-dropdown-title">
                  {RichText.asText(prismicContent.currency.raw)}
                </div>
                <div className="currency-dropdown-current">
                  {currencyEur ? `🇪🇺 EUR` : `🇺🇸 USD`}
                  <img className="arrow" src="/img/footer/arrow.svg" />
                </div>
              </div>
              {isCurrencyDropdownOpen && (
                <>
                  <div
                    className="currency-dropdown-overlay"
                    onClick={() => setIsCurrencyDropdownOpen(false)}
                  />

                  <div className="currency-dropdown-body">
                    <div className="container-el">
                      <div
                        className="el"
                        onClick={() => {
                          setCurrencyEur(false);
                          setIsCurrencyDropdownOpen(false);
                        }}
                      >
                        🇺🇸 USD
                      </div>
                      <div
                        className="el"
                        onClick={() => {
                          setCurrencyEur(true);
                          setIsCurrencyDropdownOpen(false);
                        }}
                      >
                        🇪🇺 EUR
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="container-pricing">
              <div className="pricing">
                <div
                  className={`content ${
                    pricing * packages > minPro ? "content-unavailable" : ""
                  }`}
                >
                  <h3>{RichText.asText(prismicContent.starter_title.raw)}</h3>
                  <div className="container-price">
                    {pricing * packages < minPro ? (
                      <>
                        {pricing * packages < minStarter ? (
                          <>
                            <div className="title">
                              {RichText.asText(prismicContent.starts_at.raw)}
                            </div>
                            <div className="price">
                              {formatPrice(minStarter)}
                              <div className="subtitle">
                                {RichText.asText(prismicContent.per_month.raw)}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="price">
                              {formatPrice(pricing, 2)}
                              <sup>
                                &nbsp;
                                {RichText.asText(
                                  prismicContent.per_package.raw
                                )}
                              </sup>
                            </div>
                            <div className="subtitle">
                              {formatPrice(packages * pricing)}
                              &nbsp;
                              {RichText.asText(prismicContent.in_total.raw)}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="title">
                        {RichText.asText(prismicContent.starter_above_400.raw)}
                        &nbsp;
                        {formatPrice(minPro)}
                        &nbsp;
                        {RichText.asText(prismicContent.per_month.raw)}
                      </div>
                    )}
                  </div>
                  <a href="https://app.shipup.co/signup" className="btn">
                    <span className="btn-text">
                      <span>
                        {RichText.asText(prismicContent.create_account.raw)}
                      </span>
                    </span>
                  </a>
                  <ul>
                    <li>
                      {RichText.asText(prismicContent.starter_feature_1.raw)}
                    </li>
                    <li>
                      {RichText.asText(prismicContent.starter_feature_2.raw)}
                    </li>
                  </ul>
                  <div className="trial">
                    {RichText.asText(prismicContent.free_trial.raw)}
                  </div>
                </div>
              </div>
              <div className="pricing">
                <div className="content">
                  <h3>{RichText.asText(prismicContent.pro_title.raw)}</h3>
                  <div className="container-price">
                    {packages >= maxPackages ? (
                      <div>
                        {RichText.asText(prismicContent.custom_quote.raw)}
                      </div>
                    ) : (
                      <>
                        {pricing * packages < minPro ? (
                          <>
                            <div className="title">
                              {RichText.asText(prismicContent.starts_at.raw)}
                            </div>
                            <div className="price">
                              {formatPrice(minPro)}
                              <div className="subtitle">
                                {RichText.asText(prismicContent.per_month.raw)}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="price">
                              {formatPrice(pricing, 2)}
                              <sup>
                                &nbsp;
                                {RichText.asText(
                                  prismicContent.per_package.raw
                                )}
                              </sup>
                            </div>
                            <div className="subtitle">
                              {formatPrice(packages * pricing)}
                              &nbsp;
                              {RichText.asText(prismicContent.in_total.raw)}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  {packages >= maxPackages ? (
                    <a
                      className="btn link"
                      href={`https://resources.shipup.co/${
                        lang == "fr-fr" ? "fr-fr" : "en"
                      }/offer/book-a-demo`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="btn-text">
                        <span>
                          {RichText.asText(prismicContent.contact_sales.raw)}
                        </span>
                      </span>
                    </a>
                  ) : (
                    <a href="https://app.shipup.co/signup" className="btn">
                      <span className="btn-text">
                        <span>
                          {RichText.asText(prismicContent.create_account.raw)}
                        </span>
                      </span>
                    </a>
                  )}
                  <ul>
                    <li>{RichText.asText(prismicContent.pro_feature_1.raw)}</li>
                    <li>{RichText.asText(prismicContent.pro_feature_2.raw)}</li>
                    <li>{RichText.asText(prismicContent.pro_feature_3.raw)}</li>
                  </ul>
                  <div className="trial">
                    {RichText.asText(prismicContent.free_trial.raw)}
                  </div>
                </div>
              </div>
              <div className="pricing">
                <div className="content">
                  <h3>
                    {RichText.asText(prismicContent.enterprise_title.raw)}
                  </h3>
                  <p className="desc">
                    {RichText.asText(prismicContent.enterprise_description.raw)}
                  </p>
                  <a
                    className="btn link"
                    href={`https://resources.shipup.co/${
                      lang == "fr-fr" ? "fr-fr" : "en"
                    }/offer/book-a-demo`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="btn-text">
                      <span>
                        {RichText.asText(prismicContent.contact_sales.raw)}
                      </span>
                    </span>
                  </a>
                  <ul>
                    <li>
                      {RichText.asText(prismicContent.enterprise_feature_1.raw)}
                    </li>
                    <li>
                      {RichText.asText(prismicContent.enterprise_feature_2.raw)}
                    </li>
                    <li>
                      {RichText.asText(prismicContent.enterprise_feature_3.raw)}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pricing-section-addons">
          <div className="wrapper">
            <div className="container-title">
              <h2>
                <span>
                  {RichText.asText(prismicContent.addons_normal_title.raw)}
                </span>
                <br />
                {RichText.asText(prismicContent.addons_bold_title.raw)}
              </h2>
              <p>{RichText.asText(prismicContent.addons_subtitle.raw)}</p>
            </div>
            <div className="addon-list">
              <div className="container-addons">
                <div className="addon-description">
                  <h3>{RichText.asText(prismicContent.sde_title.raw)}</h3>
                  <p>{RichText.asText(prismicContent.sde_description.raw)}</p>
                  <Link
                    to={linkResolver({
                      lang,
                      uid: "products_smart-delivery-estimate",
                    })}
                    className="link"
                  >
                    <span className="link-text">
                      {RichText.asText(prismicContent.sde_cta.raw)}
                    </span>
                  </Link>
                </div>
                <div className="addon-price">
                  <div className="price">
                    {formatPrice(pricing * sdeMultiple, 2)}
                    <sup>
                      &nbsp;
                      {RichText.asText(prismicContent.per_package.raw)}
                    </sup>
                  </div>
                </div>
              </div>
              <div className="container-addons">
                <div className="addon-description">
                  <h3>{RichText.asText(prismicContent.feedback_title.raw)}</h3>
                  <p>
                    {RichText.asText(prismicContent.feedback_description.raw)}
                  </p>
                  <Link
                    to={linkResolver({
                      lang,
                      uid: "products_feedback",
                    })}
                    className="link"
                  >
                    <span className="link-text">
                      {RichText.asText(prismicContent.feedback_cta.raw)}
                    </span>
                  </Link>
                </div>
                <div className="addon-price">
                  <div className="price">
                    {formatPrice(pricing * feedbackMultiple, 2)}
                    <sup>
                      &nbsp;
                      {RichText.asText(prismicContent.per_package.raw)}
                    </sup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pricing-section-features">
          <img className="obj-1" src="/img/3a-pricing/dots.svg" alt="" />
          <div className="wrapper">
            <div className="container-title">
              <h2>{RichText.asText(prismicContent.detailed_features.raw)}</h2>
            </div>
            <div className="container-features">
              <div className="container-col">
                <div className="col-text">
                  <ul>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.features_title.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.tracking_page.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.analytics.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.customer_support.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.sms.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.order_prep.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.webhook.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.untracked_packages.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.filter_emails.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.ftp.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.dns_delegation.raw)}
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.addons_bold_title.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.sde.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.feedback_title.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.custom_email.raw)}
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.support_title.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.documentation.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.chat_email_support.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.onboarding.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.tech_support.raw)}
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        {RichText.asText(prismicContent.account_manager.raw)}
                      </div>
                    </li>
                  </ul>
                </div>
                <div data-col="starter" className="col-fgr">
                  <div className="head-col">
                    <h3>{RichText.asText(prismicContent.starter_title.raw)}</h3>
                    <a href="https://app.shipup.co/signup" className="btn">
                      <span className="btn-text">
                        <span>
                          {RichText.asText(prismicContent.create_account.raw)}
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="container-cell">
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="container-cell">
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="container-cell">
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div data-col="pro" className="col-fgr">
                  <div className="head-col">
                    <h3>{RichText.asText(prismicContent.pro_title.raw)}</h3>
                    <a href="https://app.shipup.co/signup" className="btn">
                      <span className="btn-text">
                        <span>
                          {RichText.asText(prismicContent.create_account.raw)}
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="container-cell">
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <div className="cell-content">
                        {RichText.asText(prismicContent.sms_pricing.raw)}
                      </div>
                    </div>
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="container-cell">
                    <div className="cell">
                      <div className="cell-content">
                        <Link
                          to={linkResolver({
                            lang,
                            uid: "products_smart-delivery-estimate",
                          })}
                          className="link-reset"
                        >
                          {RichText.asText(prismicContent.more_information.raw)}
                        </Link>
                      </div>
                    </div>
                    <div className="cell">
                      <div className="cell-content">
                        <Link
                          to={linkResolver({
                            lang,
                            uid: "products_feedback",
                          })}
                          className="link-reset"
                        >
                          {RichText.asText(prismicContent.more_information.raw)}
                        </Link>
                      </div>
                    </div>
                    <div className="cell">
                      <div className="cell-content">
                        <a
                          className="btn link"
                          href={`https://resources.shipup.co/${
                            lang == "fr-fr" ? "fr-fr" : "en"
                          }/offer/book-a-demo`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {RichText.asText(prismicContent.contact_sales.raw)}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="container-cell">
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <img
                        className="check"
                        src="/img/3a-pricing/icn-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="cell">
                      <div className="cell-content">
                        {RichText.asText(prismicContent.onboarding_timing.raw)}
                      </div>
                    </div>
                    <div className="cell">
                      <div className="cell-content">
                        {RichText.asText(
                          prismicContent.tech_support_timing.raw
                        )}
                      </div>
                    </div>
                    <div className="cell">
                      <img
                        className="cross"
                        src="/img/3a-pricing/icn-cross.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div data-col="enterprise" className="col-fgr">
                  <div className="head-col">
                    <h3>
                      {RichText.asText(prismicContent.enterprise_title.raw)}
                    </h3>
                    <a
                      className="btn link"
                      href={`https://resources.shipup.co/${
                        lang == "fr-fr" ? "fr-fr" : "en"
                      }/offer/book-a-demo`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="btn-text">
                        <span>
                          {RichText.asText(prismicContent.contact_sales.raw)}
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="container-cell">
                    {prismicContent.enterprise_features.map(
                      ({ feature_title, feature_description }, idx) => (
                        <div className="cell" key={idx}>
                          <div className="content">
                            <h4>{RichText.asText(feature_title.raw)}</h4>
                            <div className="cell-content">
                              {RichText.asText(feature_description.raw)}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="section-faq">
          <div className="wrapper">
            <div className="head">
              <h2>
                {RichText.asText(prismicContent.faq_bold_title.raw)}
                <span>{RichText.asText(prismicContent.faq_normal_title.raw)}</span>
              </h2>
              <p>{RichText.asText(prismicContent.faq_description.raw)}</p>
            </div>
            <ul>
              {prismicContent.q_and_a.map(({ answer, question }) => (
                <FaqElement question={question} answer={answer} />
              ))}
            </ul>
          </div>
        </section> */}

        <SectionDemo lang={lang} />
      </Layout>
    </MuiThemeProvider>
  );
};

export const query = graphql`
  query pricingQuery($lang: String!) {
    prismicPricing(lang: { eq: $lang }, uid: { eq: "pricing" }) {
      lang
      uid
      data {
        prismic_name {
          html
          text
          raw
        }
        title {
          html
          text
          raw
        }
        sub_title {
          html
          text
          raw
        }
        packages_bold {
          html
          text
          raw
        }
        per_month_normal {
          html
          text
          raw
        }
        currency {
          html
          text
          raw
        }
        custom_quote {
          html
          text
          raw
        }
        starter_title {
          html
          text
          raw
        }
        starter_feature_1 {
          html
          text
          raw
        }
        starter_feature_2 {
          html
          text
          raw
        }
        starter_above_400 {
          html
          text
          raw
        }
        faq_bold_title {
          html
          text
          raw
        }
        faq_normal_title {
          html
          text
          raw
        }
        faq_description {
          html
          text
          raw
        }
        starts_at {
          html
          text
          raw
        }
        per_month {
          html
          text
          raw
        }
        create_account {
          html
          text
          raw
        }
        free_trial {
          html
          text
          raw
        }
        pro_title {
          html
          text
          raw
        }
        pro_feature_1 {
          html
          text
          raw
        }
        pro_feature_2 {
          html
          text
          raw
        }
        pro_feature_3 {
          html
          text
          raw
        }
        enterprise_title {
          html
          text
          raw
        }
        enterprise_description {
          html
          text
          raw
        }
        contact_sales {
          html
          text
          raw
        }
        enterprise_feature_1 {
          html
          text
          raw
        }
        enterprise_feature_2 {
          html
          text
          raw
        }
        enterprise_feature_3 {
          html
          text
          raw
        }
        detailed_features {
          html
          text
          raw
        }
        features_title {
          html
          text
          raw
        }
        tracking_page {
          html
          text
          raw
        }
        analytics {
          html
          text
          raw
        }
        customer_support {
          html
          text
          raw
        }
        sms {
          html
          text
          raw
        }
        sms_pricing {
          html
          text
          raw
        }
        order_prep {
          html
          text
          raw
        }
        sde {
          html
          text
          raw
        }
        webhook {
          html
          text
          raw
        }
        untracked_packages {
          html
          text
          raw
        }
        filter_emails {
          html
          text
          raw
        }
        ftp {
          html
          text
          raw
        }
        dns_delegation {
          html
          text
          raw
        }
        custom_email {
          html
          text
          raw
        }
        support_title {
          html
          text
          raw
        }
        documentation {
          html
          text
          raw
        }
        chat_email_support {
          html
          text
          raw
        }
        onboarding {
          html
          text
          raw
        }
        onboarding_timing {
          html
          text
          raw
        }
        tech_support {
          html
          text
          raw
        }
        tech_support_timing {
          html
          text
          raw
        }
        account_manager {
          html
          text
          raw
        }
        enterprise_features {
          feature_description {
            html
            text
            raw
          }
          feature_title {
            html
            text
            raw
          }
        }
        q_and_a {
          answer {
            html
            text
            raw
          }
          question {
            html
            text
            raw
          }
        }
        sde_cta {
          html
          raw
          text
        }
        sde_description {
          html
          raw
          text
        }
        sde_title {
          html
          raw
          text
        }
        addons_bold_title {
          html
          raw
          text
        }
        addons_normal_title {
          text
          raw
          html
        }
        addons_subtitle {
          html
          raw
          text
        }
        feedback_cta {
          raw
          text
          html
        }
        feedback_description {
          html
          raw
          text
        }
        feedback_title {
          html
          raw
          text
        }
        in_total {
          html
          raw
          text
        }
        more_information {
          html
          raw
          text
        }
        per_package {
          html
          raw
          text
        }
      }
    }
  }
`;

export default withPreview(Pricing);

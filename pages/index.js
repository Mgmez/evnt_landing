import * as React from 'react';
import ProductSmokingHero from '/modules/views/home/ProductSmokingHero';
import AppFooter from '/modules/views/home/AppFooter';
import ProductHero from '/modules/views/home/ProductHero';
import ProductValues from '/modules/views/home/ProductValues';
import ProductHowItWorks from '/modules/views/home/ProductHowItWorks';
import ProductCTA from '/modules/views/home/ProductCTA';
import AppAppBar from '/modules/views/home/AppAppBar';
import withRoot from '/modules/withRoot';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter/>
    </React.Fragment>
  );
}

export default withRoot(Index);

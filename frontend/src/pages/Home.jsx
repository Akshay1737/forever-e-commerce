import React from 'react'
import Hero from '../components/hero.jsx'
import LatestCollection from '../components/LatestCollection.jsx'
import BestSeller from '../components/BestSeller.jsx'
import OurPolicies from '../components/OurPolicies.jsx'
import Newsletterbox from '../components/Newsletterbox.jsx'
const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestCollection></LatestCollection>
      <BestSeller></BestSeller>
      <OurPolicies></OurPolicies>
      <Newsletterbox></Newsletterbox>
    </div>
  )
}

export default Home
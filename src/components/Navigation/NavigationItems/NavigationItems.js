import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>
        Burger Builder
      </NavigationItem>

      <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>
  );
};

NavigationItems.propTypes = {};

export default NavigationItems;

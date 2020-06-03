import * as React from 'react';

const Sep: React.FunctionComponent = () => (<span>&nbsp;|&nbsp;</span>);

const Header: React.FunctionComponent = () => (
  <p style={{textAlign:'right'}}>
    <a href='#'>Home</a>
    <Sep></Sep>
    <a href='#Summer'>Summer&nbsp;Course</a>
    <Sep></Sep>
    <a href='#AltSummer'>Alternative&nbsp;Summer&nbsp;Course</a>
    <Sep></Sep>
    <a href='#Winter'>Winter&nbsp;Course</a>
    <Sep></Sep>
    <a href='#All'>All&nbsp;Races</a>
  </p>
);

export default Header;


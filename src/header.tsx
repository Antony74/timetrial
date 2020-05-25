import * as React from 'react';

const Sep: React.FunctionComponent = () => (<span>&nbsp;|&nbsp;</span>)

const Header: React.FunctionComponent = () => (
  <p align='right'>
    <a href='#'>Home</a>
    <Sep></Sep>
    <a href='#Summer'>Summer&nbsp;Course</a>
    <Sep></Sep>
    <a href='#AltSummer'>Alternative&nbsp;Summer&nbsp;Course</a>
    <Sep></Sep>
    <a href='#Winter'>Winter&nbsp;Course</a>
    <Sep></Sep>
    <a href='#Running'>Maps</a>
    <Sep></Sep>
    <a href='#All'>All&nbsp;Races</a>
    <Sep></Sep>
    <a href='#Winter2008'>Winter&nbsp;2008&nbsp;Trophies</a>
    <Sep></Sep>
    <a href='#Summer2007'>Summer&nbsp;2007&nbsp;Trophies</a>
    <Sep></Sep>
    <a href='#Photos'>Older&nbsp;Photos</a>
  </p>
);

export default Header


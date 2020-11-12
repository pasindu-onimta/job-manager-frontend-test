import Vue from 'vue';
import moment from 'moment';
import countdown from 'countdown';
import 'moment-countdown';

// date formats

Vue.filter('formattedDate', (date) => {
  if (date === undefined) return '';
  return moment(date).format('MMM DD [at] h:mm A');
});

Vue.filter('formattedDate2', (date) => {
  if (date === undefined) return '';
  return moment(date).format('DD-MM-YYYY');
});

Vue.filter('formattedDate3', (date) => {
  if (date === undefined) return '';
  return moment(date).format('MMMM DD, YYYY');
});

Vue.filter('formattedDate4', (date) => {
  if (date === undefined) return '';
  return moment(date).format('MM/DD/YYYY');
});

Vue.filter('formattedDate5', (date) => {
  if (date === undefined) return '';
  return moment(date).format('DD/MM/YYYY');
});

Vue.filter('formattedDate6', (date) => {
  if (date === undefined) return '';
  return moment(date).format('YYYY-MM-DD');
});

Vue.filter('fromNow', (date) => {
  if (date === undefined) return '';
  return moment(date)
    .startOf('minutes')
    .fromNow();
});

Vue.filter('remainingTime', (date) => {
  if (date === undefined) return '';
  return moment(date)
    .countdown(new Date(), countdown.DAYS | countdown.HOURS, 2)
    .toString();
});

Vue.filter('firstNameOnly', (name) => {
  if (name === undefined) return '';
  return name.split(' ')[0];
});

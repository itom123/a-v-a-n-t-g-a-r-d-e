/*!
 * AG LAB · Western star signs (Sun, Moon, Rising)
 *
 * Low-precision positions after Meeus, "Astronomical Algorithms":
 *   Sun  — ch. 25, apparent longitude, about 0.01°
 *   Moon — ch. 47, the 27 largest longitude terms, about 0.05°
 *   Rising (Ascendant) — from sidereal time, obliquity and latitude
 * Tropical zodiac, 30° per sign from 0° Aries. Everything runs in the browser.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.AGAstro = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var RAD = Math.PI / 180;
  var KEYS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];

  function norm(x) { x %= 360; return x < 0 ? x + 360 : x; }
  function jd(utcMs) { return utcMs / 86400000 + 2440587.5; }
  function cent(utcMs) { return (jd(utcMs) - 2451545) / 36525; }

  /** Apparent ecliptic longitude of the Sun, degrees. */
  function sunLongitude(utcMs) {
    var T = cent(utcMs);
    var L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    var M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * RAD;
    var C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
      (0.019993 - 0.000101 * T) * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M);
    var omega = (125.04 - 1934.136 * T) * RAD;
    return norm(L0 + C - 0.00569 - 0.00478 * Math.sin(omega));
  }

  // [D, M, M', F, coefficient in 1e-6 degrees]
  var MOON = [
    [0, 0, 1, 0, 6288774], [2, 0, -1, 0, 1274027], [2, 0, 0, 0, 658314], [0, 0, 2, 0, 213618],
    [0, 1, 0, 0, -185116], [0, 0, 0, 2, -114332], [2, 0, -2, 0, 58793], [2, -1, -1, 0, 57066],
    [2, 0, 1, 0, 53322], [2, -1, 0, 0, 45758], [0, 1, -1, 0, -40923], [1, 0, 0, 0, -34720],
    [0, 1, 1, 0, -30383], [2, 0, 0, -2, 15327], [0, 0, 1, 2, -12528], [0, 0, 1, -2, 10980],
    [4, 0, -1, 0, 10675], [0, 0, 3, 0, 10034], [4, 0, -2, 0, 8548], [2, 1, -1, 0, -7888],
    [2, 1, 0, 0, -6766], [1, 0, -1, 0, -5163], [1, 1, 0, 0, 4987], [2, -1, 1, 0, 4036],
    [2, 0, 2, 0, 3994], [4, 0, 0, 0, 3861], [2, 0, -3, 0, 3665]
  ];

  /** Apparent ecliptic longitude of the Moon, degrees. */
  function moonLongitude(utcMs) {
    var T = cent(utcMs);
    var Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;
    var D = (297.8501921 + 445267.1114034 * T - 0.0018819 * T * T) * RAD;
    var M = (357.5291092 + 35999.0502909 * T - 0.0001536 * T * T) * RAD;
    var Mp = (134.9633964 + 477198.8675055 * T + 0.0087414 * T * T) * RAD;
    var F = (93.2720950 + 483202.0175233 * T - 0.0036539 * T * T) * RAD;
    var E = 1 - 0.002516 * T - 0.0000074 * T * T;
    var A1 = (119.75 + 131.849 * T) * RAD, A2 = (53.09 + 479264.29 * T) * RAD;
    var sum = 0;
    for (var i = 0; i < MOON.length; i++) {
      var t = MOON[i], c = t[4];
      if (Math.abs(t[1]) === 1) c *= E;
      else if (Math.abs(t[1]) === 2) c *= E * E;
      sum += c * Math.sin(t[0] * D + t[1] * M + t[2] * Mp + t[3] * F);
    }
    sum += 3958 * Math.sin(A1) + 1962 * Math.sin(Lp * RAD - F) + 318 * Math.sin(A2);
    var omega = (125.04452 - 1934.136261 * T) * RAD;
    return norm(Lp + sum / 1e6 - 0.00478 * Math.sin(omega));
  }

  function obliquity(utcMs) { return 23.4392911 - 0.0130042 * cent(utcMs); }

  /** Local sidereal time, degrees (east longitude positive). */
  function lst(utcMs, lon) {
    var d = jd(utcMs) - 2451545, T = d / 36525;
    return norm(280.46061837 + 360.98564736629 * d + 0.000387933 * T * T + lon);
  }

  /** Ecliptic longitude rising on the eastern horizon, degrees; null beyond the polar circles. */
  function ascendant(utcMs, lat, lon) {
    if (!isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 66) return null;
    var th = lst(utcMs, lon) * RAD, e = obliquity(utcMs) * RAD, p = lat * RAD;
    return norm(Math.atan2(Math.cos(th), -(Math.sin(th) * Math.cos(e) + Math.tan(p) * Math.sin(e))) / RAD);
  }

  function signOf(lon) { return Math.floor(norm(lon) / 30) % 12; }
  function edge(lon) { var r = norm(lon) % 30; return Math.min(r, 30 - r); }

  /**
   * Sun, Moon and Rising for a Bazi chart (uses its UTC instant and place).
   * With no birth time the chart sits at local noon: the Sun barely moves in a
   * day, the Moon may change sign (both are returned) and Rising is unknown.
   * @returns {{sun:number, moon:number, moonAlt:number|null, rising:number|null,
   *            sunCusp:boolean, risingCusp:boolean, deg:{sun:number, moon:number, rising:number|null}}}
   */
  function signs(chart) {
    var t = chart.time.utc, lat = chart.input.lat, lon = chart.input.lon;
    var known = chart.input.hour != null;
    var sunL = sunLongitude(t), moonL = moonLongitude(t);
    var moon = signOf(moonL), moonAlt = null;
    if (!known) {
      var a = signOf(moonLongitude(t - 12 * 3600000)), b = signOf(moonLongitude(t + 12 * 3600000));
      if (a !== b) { moon = a; moonAlt = b; }
    }
    var asc = known ? ascendant(t, lat, lon) : null;
    return {
      sun: signOf(sunL),
      moon: moon,
      moonAlt: moonAlt,
      rising: asc == null ? null : signOf(asc),
      sunCusp: edge(sunL) < (known ? 0.1 : 0.6),
      risingCusp: asc != null && edge(asc) < 2,
      deg: { sun: sunL, moon: moonL, rising: asc }
    };
  }

  return {
    KEYS: KEYS,
    ELEMENT: ["fire", "earth", "air", "water"],
    MODALITY: ["cardinal", "fixed", "mutable"],
    elementOf: function (i) { return ["fire", "earth", "air", "water"][i % 4]; },
    modalityOf: function (i) { return ["cardinal", "fixed", "mutable"][i % 3]; },
    sunLongitude: sunLongitude,
    moonLongitude: moonLongitude,
    obliquity: obliquity,
    lst: lst,
    ascendant: ascendant,
    signOf: signOf,
    signs: signs
  };
});

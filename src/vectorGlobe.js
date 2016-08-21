import THREE from 'three';
import topojson from 'topojson';
import world from './world-110m.json';
import {toVector} from './toVector';


const countries = topojson.feature(world, world.objects.countries).features;

export const globe = ({EARTH_RADIUS}) => {
  const sphere = () => new THREE.Mesh(
    new THREE.SphereGeometry(EARTH_RADIUS, 40, 30),
    new THREE.MeshBasicMaterial({color: 0x111111, wireframe: true}));

  const material = new THREE.LineBasicMaterial({color: 0x666666, linewidth: 1});

  const threeCountry = country => {
    const points = country
      .map(([lon, lat]) => [lat, lon])
      .map(toVector)
      .map(v => v.multiplyScalar(EARTH_RADIUS + 2));

    const curve = new THREE.CatmullRomCurve3(points);
    curve.closed = true;

    const geometry = new THREE.Geometry();
    geometry.vertices = curve.getPoints(country.length);

    return new THREE.Line(geometry, material);
  };


  return countries
    .reduce(
      (result, country) => {
        if (country.geometry.type === 'Polygon') {
          return result.concat(country.geometry.coordinates.map(threeCountry));
        } else if (country.geometry.type === 'MultiPolygon') {
          return country.geometry.coordinates
            .reduce((r, polygon) => r.concat(polygon.map(threeCountry)), result);
        }
        return null;
      },
      [sphere()]);

//  return [sphere()].concat(countries.map(threeCountry));
};

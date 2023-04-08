export type LatLng = [number, number];
export type Polygon = Array<[number, number]>;

export default function usePolygon() {
  const getCenterCoordinates = (polygon: Polygon): LatLng => {
  let mediaX = 0;
    let mediaY = 0;

    for (let i = 0; i < polygon.length; i++) {
      mediaX += polygon[i][0];
      mediaY += polygon[i][1];
    }

    mediaX /= polygon.length;
    mediaY /= polygon.length;

    return [mediaX, mediaY];
  };

  return { getCenterCoordinates };
}

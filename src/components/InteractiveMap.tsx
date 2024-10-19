'use client'

import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon, LatLngExpression } from 'leaflet'

const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDQ4QzE2IDQ4IDMyIDMxLjY3MzQgMzIgMTZDMzIgNy4xNjM0NCAyNC44MzY2IDAgMTYgMEM3LjE2MzQ0IDAgMCA3LjE2MzQ0IDAgMTZDMCAzMS42NzM0IDE2IDQ4IDE2IDQ4WiIgZmlsbD0iIzAwNzFFMyIvPgo8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI4IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -48]
})

interface City {
  name: string
  coordinates: LatLngExpression
  address: string
  phone: string
}

const cities: City[] = [
    {
      name: 'Aktau',
      coordinates: [43.6511, 51.1570],
      address: '130000, Aktau, Kazakhstan',
      phone: '+7 (7292) 55-66-77'
    },
    {
      name: 'Aktobe',
      coordinates: [50.2839, 57.1660],
      address: '030000, Aktobe, Kazakhstan',
      phone: '+7 (7132) 55-66-77'
    },
    {
      name: 'Almaty',
      coordinates: [43.2220, 76.8512],
      address: '050000, Almaty, Kazakhstan',
      phone: '+7 (727) 332-33-44'
    },
    {
      name: 'Astana',
      coordinates: [51.1605, 71.4704],
      address: '010000, Astana, Kazakhstan',
      phone: '+7 (7172) 55-66-77'
    },
    {
      name: 'Atyrau',
      coordinates: [47.0945, 51.9232],
      address: '060000, Atyrau, Kazakhstan',
      phone: '+7 (7122) 55-66-77'
    },
    {
      name: 'Zhanaozen',
      coordinates: [43.3450, 52.8570],
      address: '130200, Zhanaozen, Kazakhstan',
      phone: '+7 (7293) 55-66-77'
    },
    {
      name: 'Karaganda',
      coordinates: [49.8047, 73.1094],
      address: '100000, Karaganda, Kazakhstan',
      phone: '+7 (7212) 55-66-77'
    },
    {
      name: 'Kokshetau',
      coordinates: [53.2833, 69.4000],
      address: '020000, Kokshetau, Kazakhstan',
      phone: '+7 (7162) 55-66-77'
    },
    {
      name: 'Kulsary',
      coordinates: [46.9823, 54.0156],
      address: '060600, Kulsary, Kazakhstan',
      phone: '+7 (7123) 55-66-77'
    },
    {
      name: 'Kyzylorda',
      coordinates: [44.8488, 65.4823],
      address: '120000, Kyzylorda, Kazakhstan',
      phone: '+7 (7242) 55-66-77'
    },
    {
      name: 'Oskemen',
      coordinates: [49.9460, 82.6286],
      address: '070000, Oskemen, Kazakhstan',
      phone: '+7 (7232) 55-66-77'
    },
    {
      name: 'Petropavlovsk',
      coordinates: [54.8665, 69.1473],
      address: '150000, Petropavlovsk, Kazakhstan',
      phone: '+7 (7152) 55-66-77'
    },
    {
      name: 'Semey',
      coordinates: [50.4112, 80.2274],
      address: '071400, Semey, Kazakhstan',
      phone: '+7 (7222) 55-66-77'
    },
    {
      name: 'Taldykorgan',
      coordinates: [45.0156, 78.3739],
      address: '040000, Taldykorgan, Kazakhstan',
      phone: '+7 (7282) 55-66-77'
    },
    {
      name: 'Taraz',
      coordinates: [42.9000, 71.3667],
      address: '080000, Taraz, Kazakhstan',
      phone: '+7 (7262) 55-66-77'
    },
    {
      name: 'Turkestan',
      coordinates: [43.3000, 68.2559],
      address: '161200, Turkestan, Kazakhstan',
      phone: '+7 (7253) 55-66-77'
    },
    {
      name: 'Uralsk',
      coordinates: [51.2354, 51.3665],
      address: '090000, Uralsk, Kazakhstan',
      phone: '+7 (7112) 55-66-77'
    },
    {
      name: 'Shymkent',
      coordinates: [42.3417, 69.5901],
      address: '160000, Shymkent, Kazakhstan',
      phone: '+7 (7252) 55-66-77'
    },
    {
      name: 'Ekibastuz',
      coordinates: [51.7298, 75.3247],
      address: '141200, Ekibastuz, Kazakhstan',
      phone: '+7 (7187) 55-66-77'
    }
  ];
  

export default function InteractiveMap() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  return (
    <div className="relative h-full">
      <MapContainer 
        center={[48.0196, 66.9237] as LatLngExpression} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker 
            key={city.name} 
            position={city.coordinates}
            icon={customIcon}
            eventHandlers={{
              click: () => setSelectedCity(city),
            }}
          >
            <Popup>{city.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedCity && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full m-4 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedCity.name}</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Address:</h3>
                <p className="text-gray-600">{selectedCity.address}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Phone:</h3>
                <p className="text-gray-600">{selectedCity.phone}</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedCity(null)}
              className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

"use client";

import React, { useState, useEffect } from "react";

interface ShippingRates {
  price_per_kg_composition: number;
  price_per_kg_door: number;
  estimated_delivery_days_min: number;
  estimated_delivery_days_max: number;
  base_cost_composition: number;
  base_cost_door: number;
}

export default function TransportCalculator() {
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [startCity, setStartCity] = useState("");
  const [endCity, setEndCity] = useState("");
  const [shippingType, setShippingType] = useState<"composition" | "door">("composition");
  const [cost, setCost] = useState<number | null>(null);
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);
  const [rates, setRates] = useState<ShippingRates | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/cities')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => {
        console.error('Failed to fetch cities:', error);
        setError('Failed to load cities. Please try again later.');
      });
  }, []);

  useEffect(() => {
    if (startCity && endCity) {
      fetch(`/api/shipping-rates?startCity=${startCity}&endCity=${endCity}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched shipping rates:', data);
          setRates(data);
        })
        .catch(error => {
          console.error('Failed to fetch shipping rates:', error);
          setError('Failed to load shipping rates. Please try again later.');
        });
    }
  }, [startCity, endCity]);

  const calculateCost = () => {
    if (!rates || !weight) {
      setError("Please fill in all required fields and ensure shipping rates are loaded.");
      return;
    }

    let calculatedWeight = parseFloat(weight);
    if (isNaN(calculatedWeight) || calculatedWeight <= 0) {
      setError("Please enter a valid weight");
      return;
    }

    // Calculate volume weight if dimensions are provided
    if (length && width && height) {
      const volumeWeight = (parseFloat(length) * parseFloat(width) * parseFloat(height)) / 5000; // 1m3 = 200kg, so divide by 5000 for cm3
      calculatedWeight = Math.max(calculatedWeight, volumeWeight);
    }

    const pricePerKg = shippingType === "composition" 
      ? rates.price_per_kg_composition 
      : rates.price_per_kg_door;
    const baseCost = shippingType === "composition" 
      ? rates.base_cost_composition 
      : rates.base_cost_door;

    let calculatedCost: number;

    if (calculatedWeight <= 20) {
      calculatedCost = baseCost;
    } else {
      calculatedCost = baseCost + (calculatedWeight - 20) * pricePerKg;
    }

    setCost(Number(calculatedCost.toFixed(2)));
    setDeliveryEstimate(`от ${rates.estimated_delivery_days_min} до ${rates.estimated_delivery_days_max} дней`);
    setError(null);
  };

  const clear = () => {
    setWeight("");
    setLength("");
    setWidth("");
    setHeight("");
    setStartCity("");
    setEndCity("");
    setShippingType("composition");
    setCost(null);
    setDeliveryEstimate(null);
    setRates(null);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-2xl bg-white p-8 sm:p-12 rounded-3xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-8 sm:mb-12 text-center text-[#1D1D1F]">Калькулятор доставки</h1>
        {error && (
          <div className="mb-8 p-4 bg-[#FFF0F0] text-[#FF3B30] text-sm rounded-xl">
            {error}
          </div>
        )}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#86868B] mb-2">Город отправки</label>
              <select
                value={startCity}
                onChange={(e) => setStartCity(e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F5F7] border-none rounded-xl focus:ring-2 focus:ring-[#0071E3] transition-colors"
              >
                <option value="">Выберите город</option>
                {Array.isArray(cities) && cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#86868B] mb-2">Город назначения</label>
              <select
                value={endCity}
                onChange={(e) => setEndCity(e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F5F7] border-none rounded-xl focus:ring-2 focus:ring-[#0071E3] transition-colors"
              >
                <option value="">Выберите город</option>
                {Array.isArray(cities) && cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#86868B] mb-2">Вес (кг)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 bg-[#F5F5F7] border-none rounded-xl focus:ring-2 focus:ring-[#0071E3] transition-colors"
              placeholder="Введите вес"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Длина (cм)", value: length, setter: setLength },
              { label: "Ширина (cм)", value: width, setter: setWidth },
              { label: "Высота (cм)", value: height, setter: setHeight },
            ].map((dim) => (
              <div key={dim.label}>
                <label className="block text-sm font-medium text-[#86868B] mb-2">{dim.label}</label>
                <input
                  type="number"
                  value={dim.value}
                  onChange={(e) => dim.setter(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F5F5F7] border-none rounded-xl focus:ring-2 focus:ring-[#0071E3] transition-colors"
                  placeholder="Опционально"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#86868B] mb-4">Тип доставки</label>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
              {[
                { value: "composition", label: "До склада" },
                { value: "door", label: "До двери" }
              ].map((type) => (
                <label key={type.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value={type.value}
                    checked={shippingType === type.value}
                    onChange={(e) => setShippingType(e.target.value as "composition" | "door")}
                    className="sr-only"
                  />
                  <span className={`w-6 h-6 mr-3 border-2 rounded-full flex items-center justify-center ${shippingType === type.value ? 'border-[#0071E3] bg-[#0071E3]' : 'border-[#86868B]'}`}>
                    {shippingType === type.value && <span className="w-2 h-2 bg-white rounded-full"></span>}
                  </span>
                  <span className="text-sm text-[#1D1D1F]">{type.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
            <button
              onClick={calculateCost}
              className="flex-1 bg-[#0071E3] text-white py-3 px-6 rounded-full hover:bg-[#0077ED] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:ring-opacity-50"
            >
              Посчитать
            </button>
            <button
              onClick={clear}
              className="flex-1 bg-[#F5F5F7] text-[#0071E3] py-3 px-6 rounded-full hover:bg-[#E8E8ED] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:ring-opacity-50"
            >
              Очистить
            </button>
          </div>
        </div>
        {cost !== null && deliveryEstimate && (
          <div className="mt-12 p-8 bg-[#F5F5F7] rounded-2xl">
            <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] mb-3">
              Стоимость доставки: <span className="text-[#0071E3]">{cost} тенге</span>
            </p>
            <p className="text-sm text-[#86868B]">
              Ожидаемое время доставки: <span className="font-medium">{deliveryEstimate}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
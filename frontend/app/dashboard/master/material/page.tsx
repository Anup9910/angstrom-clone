'use client';

import { useState } from 'react';

export default function MaterialMasterPage() {
  const [commodityCode, setCommodityCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: call your FastAPI endpoint here
    console.log('Submitting material master form', {
      commodity_code: commodityCode,
      description,
    });

    setCommodityCode('');
    setDescription('');
  };

  const handleReset = () => {
    setCommodityCode('');
    setDescription('');
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Material Master</h1>
          <p className="text-gray-600">Fill in the details below to add a new material record.</p>
        </header>

        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Material Details</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="commodity_code" className="block text-sm font-medium text-gray-700 mb-2">
                Commodity Code *
              </label>
              <input
                id="commodity_code"
                type="text"
                value={commodityCode}
                onChange={(event) => setCommodityCode(event.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                placeholder="Enter material/item code"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black resize-none"
                placeholder="Enter a short description"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface Service {
  id: string;
  title: string;
  duration: string;
  highlights: string[];
  order: number;
  price: number;
  whatsappNumber: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    highlights: [''],
    order: 0,
    price: 0,
    whatsappNumber: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const servicesCollection = collection(db, 'services');
      const servicesSnapshot = await getDocs(servicesCollection);
      const servicesData = servicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];
      
      // Sort by order
      servicesData.sort((a, b) => a.order - b.order);
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const filteredHighlights = formData.highlights.filter(h => h.trim() !== '');
      await addDoc(collection(db, 'services'), {
        ...formData,
        highlights: filteredHighlights,
        price: Number(formData.price),
        order: Number(formData.order)
      });
      
      resetForm();
      setShowAddForm(false);
      fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const serviceRef = doc(db, 'services', editingService.id);
      const filteredHighlights = formData.highlights.filter(h => h.trim() !== '');
      
      await updateDoc(serviceRef, {
        ...formData,
        highlights: filteredHighlights,
        price: Number(formData.price),
        order: Number(formData.order)
      });
      
      resetForm();
      setEditingService(null);
      fetchServices();
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteDoc(doc(db, 'services', serviceId));
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const startEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      duration: service.duration,
      highlights: service.highlights.length > 0 ? service.highlights : [''],
      order: service.order,
      price: service.price,
      whatsappNumber: service.whatsappNumber
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      duration: '',
      highlights: [''],
      order: 0,
      price: 0,
      whatsappNumber: ''
    });
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => i === index ? value : h)
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Service
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingService) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            
            <form onSubmit={editingService ? handleUpdateService : handleAddService}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: Number(e.target.value) }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Highlights
                  </label>
                  {formData.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => updateHighlight(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                        placeholder={`Highlight ${index + 1}`}
                      />
                      {formData.highlights.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHighlight(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add Highlight
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingService(null);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingService ? 'Update' : 'Add'} Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{service.title}</h2>
              <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                Order: {service.order}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Duration:</strong> {service.duration}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>WhatsApp:</strong> {service.whatsappNumber}
              </p>
              
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Highlights:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {service.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">₹{service.price}</span>
              <div className="space-x-2">
                <button 
                  onClick={() => startEdit(service)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteService(service.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No services found. Add your first service!</p>
        </div>
      )}
    </div>
  );
};

export default Services;
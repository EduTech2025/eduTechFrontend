'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ProductCards from '@/components/Products/productCards';
import ModalOne from '@/components/Products/modelOne';
import ModalTwo from '@/components/Products/modelTwo';

const toolsWithSecondModal = ['Organize PDF'];

export default function ProductsPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [modalCategory, setModalCategory] = useState('');
  const [modalSearch, setModalSearch] = useState('');
  const [activeSubProduct, setActiveSubProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const openModalWithCategory = (category) => {
    const categoryParam = category.toLowerCase();
    setModalCategory(category.toUpperCase());
    setModalSearch('');
    setModalVisible(true);

    // Update URL
    router.push(`?${categoryParam}=open`, { shallow: true });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSecondModalVisible(false);
    setActiveSubProduct(null);
    setModalSearch('');
    setModalCategory('');

    // Clean the URL
    router.push('/products', { shallow: true });
  };

  // Autofocus input when modal opens
  useEffect(() => {
    if (modalVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalVisible]);

  // Prevent scroll behind modal
  useEffect(() => {
    document.body.style.overflow =
      modalVisible || secondModalVisible ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [modalVisible, secondModalVisible]);

  // Check query on load for modal auto-open
  useEffect(() => {
    const queryKeys = searchParams?.keys();
    const keysArray = queryKeys ? Array.from(queryKeys) : [];
    if (keysArray.length && searchParams.get(keysArray[0]) === 'open') {
      openModalWithCategory(keysArray[0]);
    }
  }, []);

  return (
    <div className="text-white font-sans px-4 py-6">
      {/* Product Cards */}
      <ProductCards openModalWithCategory={openModalWithCategory} />

      {/* First Modal */}
      {modalVisible && (
        <ModalOne
          modalCategory={modalCategory}
          modalSearch={modalSearch}
          setModalSearch={setModalSearch}
          setModalVisible={setModalVisible}
          setSecondModalVisible={setSecondModalVisible}
          setActiveSubProduct={setActiveSubProduct}
          toolsWithSecondModal={toolsWithSecondModal}
          router={router}
          setLoading={setLoading}
          closeModal={closeModal} // add this to use for modal close
        />
      )}

      {/* Second Modal */}
      {secondModalVisible && activeSubProduct && (
        <ModalTwo
          activeSubProduct={activeSubProduct}
          setSecondModalVisible={setSecondModalVisible}
        />
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent" />
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ProductCards from '@/components/Products/productCards';
import ModalOne from '@/components/Products/modelOne';
import ModalTwo from '@/components/Products/modelTwo';

const toolsWithSecondModal = ['Organize PDF'];

function ProductsPageContent() {
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
    router.push('/products', { shallow: true });
  };

  useEffect(() => {
    if (modalVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalVisible]);

  useEffect(() => {
    document.body.style.overflow = modalVisible || secondModalVisible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalVisible, secondModalVisible]);

  // Auto-open modal based on query
  useEffect(() => {
    const queryKeys = searchParams?.keys();
    const keysArray = queryKeys ? Array.from(queryKeys) : [];
    if (keysArray.length && searchParams.get(keysArray[0]) === 'open') {
      openModalWithCategory(keysArray[0]);
    }
  }, [searchParams]);

  return (
    <div className="text-white font-sans px-4 py-6">
      <ProductCards openModalWithCategory={openModalWithCategory} />

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
          closeModal={closeModal}
        />
      )}

      {secondModalVisible && activeSubProduct && (
        <ModalTwo
          activeSubProduct={activeSubProduct}
          setSecondModalVisible={setSecondModalVisible}
        />
      )}

      {loading && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent" />
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}

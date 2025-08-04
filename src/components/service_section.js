'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const services = [
  {
    id: 'web',
    title: 'Web Development',
    icon: '/assets/home/web_dev.png',
    description:
      'Responsive, SEO-optimized, and blazing-fast websites built with cutting-edge technologies and best practices.',
  },
  {
    id: 'app',
    title: 'App Development',
    icon: '/assets/home/app_dev.png',
    description:
      'Cross-platform mobile apps that are fast, scalable, and optimized for performance and user experience.',
  },
  {
    id: 'wordpress',
    title: 'WordPress Development',
    icon: '/assets/home/wordpress.png',
    description:
      'Custom WordPress solutions tailored for performance, easy content management, and modern aesthetics.',
  },
  {
    id: 'shopify',
    title: 'Shopify Development',
    icon: '/assets/home/shopify.png',
    description:
      'Customizable Shopify stores built for conversion, performance, and seamless shopping experiences.',
  },
];

const SectionWrapper = styled.section`
  padding: 4rem 1.5rem;
  background: #000;
  color: white;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`;

const SubHeading = styled.p`
  font-size: 1rem;
  color: #aaa;
  margin-bottom: 2rem;
`;

const TabRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  background: ${({ active }) => (active ? '#a855f7' : 'transparent')};
  border: 1px solid #a855f7;
  color: ${({ active }) => (active ? 'white' : '#a855f7')};
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #9333ea;
    color: white;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
  }

  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
  }
`;

const Icon = styled.img`
  width: 80%;
  height: auto;
  object-fit: contain;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #ccc;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const Button = styled.button`
  background: #a855f7;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #9333ea;
  }
`;

const ServiceSection = () => {
  const [activeTab, setActiveTab] = useState('web');
  const router = useRouter();

  const handleViewMore = (id) => {
    router.push(`/services?tab=${id}`);
  };

  const currentService = services.find((s) => s.id === activeTab);

  return (
    <SectionWrapper>
      <Heading>Our Services</Heading>
      <SubHeading>
        Empowering you with tailored tech solutions built for the future!
      </SubHeading>

      <div className="overflow-x-auto my-4 mx-1 whitespace-nowrap no-scrollbar">
          <div className="inline-flex gap-2">
            {services.map((service) => (
              <TabButton
                key={service.id}
                active={activeTab === service.id}
                onClick={() => setActiveTab(service.id)}
                className="flex-shrink-0"
              >
                {service.title}
              </TabButton>
            ))}
          </div>
        </div>


      {currentService && (
        <Card>
          <Icon src={currentService.icon} alt={currentService.title} />
          <Title>{currentService.title}</Title>
          <Description>{currentService.description}</Description>
          <Button onClick={() => handleViewMore(currentService.id)}>View More</Button>
        </Card>
      )}
    </SectionWrapper>
  );
};

export default ServiceSection;

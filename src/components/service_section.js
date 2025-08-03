'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const services = [
  {
    id: 'web',
    title: 'Web Development',
    icon: '/assets/home/web_dev.png',
    description:
      'We build fast, SEO-optimized websites using modern framework and scalable architecture.',
  },
  {
    id: 'app',
    title: 'App Development',
    icon: '/assets/home/app_dev.png',
    description:
      'We build fast, SEO-optimized websites using modern framework and scalable architecture.',
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    icon: '/assets/home/wordpress.png',
    description:
      'We build fast, SEO-optimized websites using modern framework and scalable architecture.',
  },
  {
    id: 'shopify',
    title: 'Shopify',
    icon: '/assets/home/shopify.png',
    description:
      'We build fast, SEO-optimized websites using modern framework and scalable architecture.',
  },
];

const SectionWrapper = styled.section`
  padding: 5rem 2rem;
  background: #000;
  color: white;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SubHeading = styled.p`
  font-size: 1rem;
  color: #aaa;
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 3rem;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  padding: 2rem 1rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.08);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
  }
`;

const Icon = styled.img`
  width: 80%;
  height: auto;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 0.9rem;
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
  const router = useRouter();

  const handleViewMore = (id) => {
    router.push(`/services?tab=${id}`);
  };

  return (
    <SectionWrapper>
      <Heading>Our Services</Heading>
      <SubHeading>
        Empowering you with tailored tech solutions built for the future!
      </SubHeading>

      <Grid>
        {services.map((service) => (
          <Card
            key={service.id}
            className={service.id === 'app' || service.id === 'shopify' ? 'mt-12' : 'mb-12'}
          >
            <Icon src={service.icon} alt={service.title} />
            <Title>{service.title}</Title>
            <Description>{service.description}</Description>
            <Button onClick={() => handleViewMore(service.id)}>View More</Button>
          </Card>
        ))}
      </Grid>
    </SectionWrapper>
  );
};

export default ServiceSection;

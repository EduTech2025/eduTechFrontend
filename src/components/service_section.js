'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { FaCode, FaMobileAlt, FaPalette, FaShopify } from 'react-icons/fa';

const serviceTabs = [
    {
        id: 'web',
        label: 'Web Development',
        icon: <FaCode />,
        description:
            'We build fast, SEO-optimized websites using modern frameworks and scalable architecture.',
        logos: [
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-plain-wordmark.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-plain-wordmark.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-plain.svg',
        ],
    },
    {
        id: 'app',
        label: 'App Development',
        icon: <FaMobileAlt />,
        description:
            'We craft cross-platform mobile apps with intuitive UI and smooth performance.',
        logos: [
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
        ],
    },
    {
        id: 'uiux',
        label: 'UI/UX Design',
        icon: <FaPalette />,
        description:
            'We design thoughtful user experiences focused on engagement and accessibility.',
        tech: [
            'Design Systems',
            'Micro-Interactions',
            'Dark Mode',
            'Mobile-first',
            'Accessibility',
        ],
    },
    {
        id: 'shopify',
        label: 'Shopify',
        icon: <FaShopify />,
        description:
            'Custom Shopify themes and apps designed to drive eCommerce conversion.',
        tech: ['Shopify', 'Liquid', 'App Proxy'],
    },
];

const Wrapper = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.25rem;
  backdrop-filter: blur(16px);
  color: #eee;
  box-shadow: 0 0 25px rgba(128, 90, 213, 0.2);
`;

const TabList = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 0.8rem 1.2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: ${({ active }) =>
    active ? 'rgba(168, 85, 247, 0.2)' : 'transparent'};
  color: ${({ active }) => (active ? '#fff' : '#ccc')};
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(168, 85, 247, 0.15);
    color: #fff;
  }

  .icon {
    font-size: 1.1rem;
  }
`;

const TabContent = styled.div`
  text-align: center;
  animation: fadeIn 0.4s ease-in-out;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: #d8b4fe;
  }

  .description {
    font-size: 1rem;
    color: #ccc;
    margin-bottom: 1.5rem;
    line-height: 1.6;
    max-width: 600px;
    margin-inline: auto;
  }

  .tech-tags {
    display: flex;
    justify-content: center;
    gap: 0.6rem;
    flex-wrap: wrap;
  }

  .tag {
    background: #9333ea;
    color: white;
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    font-weight: 500;
    letter-spacing: 0.03em;
    box-shadow: 0 0 8px rgba(147, 51, 234, 0.4);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ViewMoreBtn = styled.button`
  margin-top: 1rem;
  background: #8b5cf6;
  color: white;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #7c3aed;
  }
`;

 const LogoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

 const TagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;

  .tag {
    background: #9333ea;
    color: white;
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    font-weight: 500;
    letter-spacing: 0.03em;
    box-shadow: 0 0 8px rgba(147, 51, 234, 0.4);
  }
`;

const ServiceSection = () => {
    const [active, setActive] = useState(serviceTabs[0].id);
    const router = useRouter();

    const handleViewMore = () => {
        router.push(`/services?tab=${active}`);
    };

    return (
        <Wrapper>
            <TabList>
                {serviceTabs.map((tab) => (
                    <TabButton
                        key={tab.id}
                        active={active === tab.id}
                        onClick={() => setActive(tab.id)}
                    >
                        <span className="icon">{tab.icon}</span>
                        <span>{tab.label}</span>
                    </TabButton>
                ))}
            </TabList>

            {serviceTabs.map(
                (tab) =>
                    active === tab.id && (
                        <TabContent key={tab.id}>
                            <h3>{tab.label}</h3>
                            <p className="description">{tab.description}</p>

                            {tab.logos ? (
                                <LogoGrid>
                                    {tab.logos.map((logo, i) => (
                                        <img key={logo} src={logo} alt={`tech-${i}`} />
                                    ))}
                                </LogoGrid>
                            ) : (
                                <TagGrid>
                                    {tab.tech.map((t, i) => (
                                        <span key={t} className="tag">
    {t}
  </span>
                                    ))}
                                </TagGrid>
                            )}

                            <ViewMoreBtn onClick={handleViewMore}>View More</ViewMoreBtn>
                        </TabContent>
                    )
            )}
        </Wrapper>
    );
};

export default ServiceSection;

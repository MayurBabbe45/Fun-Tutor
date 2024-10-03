import React from 'react';
import Arsheyi from '../assets/team/Arsheyi.jpg';
import Mayur from '../assets/team/Mayur.jpeg';
import Rohit from '../assets/team/Rohit.jpg';
import Simran from '../assets/team/Simran.jpg';

const teamMembers = [
  {
    name: 'Mayur Babbe',
    title: 'UI/UX',
    image: Mayur,
    linkedin: 'https://www.linkedin.com/in/mayur-babbe-986a06255',
    github: 'https://github.com/MayurBabbe45'
  },
  {
    name: 'Arsheyi Bhosale',
    title: 'Model building and training',
    image: Arsheyi,
    linkedin: 'https://www.linkedin.com/in/arsheyi-bhosale-9b09b8255',
    github: 'https://github.com/arsheyiB'
  },
  {
    name: 'Rohit Dharmadhikari',
    title: 'Model building and training',
    image: Rohit,
    linkedin: 'https://www.linkedin.com/in/rohit-dharmadhikari-1bba09255/',
    github: 'https://github.com/Rohitcd-47 '
  },
  {
    name: 'Simran Sarwade',
    title: 'Model testing',
    image: Simran,
    linkedin: 'https://www.linkedin.com/in/simran-sarwade-44aa31255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    github: 'https://github.com/simransarwade'
  },
];

const Team = () => {
  return (
    <section id='Team'>
    <div className="flex items-center justify-center min-h-screen  py-48 mt-36">
      <div className="flex flex-col">
        <div className="flex flex-col mt-8">
          <div className="container max-w-7xl px-4">
            <div className="flex flex-wrap justify-center text-center mb-15">
              <div className="w-full lg:w-6/12 px-4">
                <h1 className="text-white text-4xl font-bold mb-8">Meet the Team</h1>
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center">
              {teamMembers.map((member, index) => (
                <div key={index} className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div className="flex flex-col items-center">
                    <a href={member.linkedin} className="mx-auto">
                      <img
                        className="rounded-full drop-shadow-md hover:scale-110 transition duration-300 ease-in-out w-25 h-25" // Adjusted size
                        src={member.image}
                        alt={member.name}
                        onError={(event) => {
                          event.target.src = 'path/to/placeholder.png'; // Replace with placeholder path
                        }}
                      />
                    </a>
                    <div className="text-center mt-6">
                      <h1 className="text-white text-xl font-bold mb-1">
                        {member.name}
                      </h1>
                      <div className="text-white font-normal mb-2">
                        {member.title}
                      </div>
                      <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                        <a href={member.github} className="text-white hover:text-gray-500">
                          <span className="sr-only">GitHub</span>
                          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"></svg>
                        <span className="sr-only">GitHub</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                       
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Team;
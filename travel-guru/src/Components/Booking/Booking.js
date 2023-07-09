import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';
// import { destinations } from '../fakeData/fakeData';

const Booking = () => {
    // // Get Selected destination spot
    // const { destinationId } = useParams();

    // // Get Destination-spot by its id
    // const destination = destinations.find(destination => destination.id === Number.parseInt(destinationId))
    // const { name, description } = destination;
    const [agents, setAgents] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/travel-agents');
          const data = await response.json();
          setAgents(data);
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
    return (
        <>
        {agents.map((agent) => (
          <li key={agent.id}>
            <p>Name: {agent.name}</p>
            <p>Email: {agent.email}</p>
            {/* Add other fields here */}
          </li>
        ))}
            <section className='min-vh-100 d-flex align-items-center justify-content-center'>
                <div className='tw-text-white row container tw-pt-20 tw-pb-10 tw-space-y-4'>

                    {/* Destination Spot full details */}
                    <div className='col-md-6'>
                        <div>
                            <h1 className='xl:tw-text-6xl
                     md:tw-text-5xl tw-text-4xl text-nowrap'>{agents.map((agent) => (
                        <li key={agent.id}>
                          <p>Name: {agent.name}</p>
                        </li>
                      ))}</h1>

                            <p className='lg:tw-text-lg tw-text-base tw-backdrop-blur-sm py-2 rounded-3 text-justify my-md-3'>
                            {agents.map((agent) => (
          <li key={agent.id}>
            <p>Description {agent.description}</p>
          </li>
        ))}</p>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className='col-md-6'>
                        <BookingForm destination={agents.map((agent) => (
          <li key={agent.id}>
            <p>Email: {agent.email}</p>
            {/* Add other fields here */}
          </li>
        ))} />
                    </div>
                    <div className='col-md-6'>
                        <BookingForm destination={agents.map((agent) => (
          <li key={agent.id}>
            <p>Phone Number: {agent.phone_number}</p>
            {/* Add other fields here */}
          </li>
        ))} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Booking;



// const Booking = () => {
// //   const [agents, setAgents] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await fetch('/api/travel-agents');
// //         const data = await response.json();
// //         setAgents(data);
// //       } catch (error) {
// //         console.log('Error fetching data:', error);
// //       }
// //     };

// //     fetchData();
// //   }, []);

//   return (
//     <div>
//       <h1>Travel Agents</h1>
//       <ul>
//         {agents.map((agent) => (
//           <li key={agent.id}>
//             <p>Name: {agent.name}</p>
//             <p>Email: {agent.email}</p>
//             {/* Add other fields here */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Booking;

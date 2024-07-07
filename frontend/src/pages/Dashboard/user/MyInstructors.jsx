import React, { useEffect, useState } from 'react';
import useUser from '../../../hooks/useUser';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { IoMdSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';

const MyInstructors = () => {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [userInstructors, setUserInstructors] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [hr, setHR] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [userDiets, setUserDiets] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`http://localhost:5000/userInstructor/${currentUser?.email}`)
      .then((res) => {
        setUserInstructors(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [axiosSecure, currentUser?.email]);

  useEffect(() => {
    axiosSecure
      .get(`http://localhost:5000/userDiet/${currentUser?.email}`)
      .then((res) => {
        setUserDiets(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [axiosSecure, currentUser?.email]);

  useEffect(() => {
    axiosSecure
      .get(`http://localhost:5000/instructor`)
      .then((res) => setInstructors(res.data))
      .catch((err) => console.log(err));
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure
      .get(`http://localhost:5000/userHR/${currentUser?.email}`)
      .then((res) => setHR(res.data))
      .catch((err) => console.log(err));
  }, [axiosSecure, currentUser?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`http://localhost:5000/userInstructor/${id}`)
          .then((res) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Instructor request has been deleted.',
              icon: 'success',
              timer: 1500
            });
            const newUserInstructors = userInstructors.filter((item) => item._id !== id);
            setUserInstructors(newUserInstructors);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className='bg-yellow-200'>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className='w-screen h-screen justify-top items-center'>
      <div className="bg-white p-8 w-[1000px] rounded-lg ">
        <div className='my-6 text-center'>
          <h1 className='text-4xl font-bold'>
            My <span className='text-secondary'>Instructors</span>
          </h1>
        </div>
        <div className='flex items-center justify-end space-x-4'>
          <input
            id='searchInput'
            type='text'
            placeholder='Search'
            className='border-gray-300 border rounded-md py-2 px-4'
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <IoMdSearch className='w-8 h-8' />
        </div>
        <div className='h-screen py-8'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='bg-white rounded-lg shadow-md p-6 mb-4 w-full'>
                <table className='w-full'>
                  <thead>
                    <tr>
                      <th className='text-left font-semibold'>#</th>
                      <th className='text-left font-semibold'>Instructor/Doctor Name</th>
                      <th className='text-left font-semibold'>Specialities</th>
                      <th className='text-left font-semibold'>Date</th>
                      <th className='text-left font-semibold'>Status</th>
                      <th className='text-left font-semibold'>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userInstructors.length === 0 ? (
                      <tr>
                        <td colSpan='6' className='text-center text-2xl'>
                          No Instructors Found
                        </td>
                      </tr>
                    ) : (
                      userInstructors
                        .filter((item) => {
                          const formattedDate = moment(item.date).format('MMMM Do YYYY').toLowerCase();
                          return (
                            item.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            formattedDate.includes(searchTerm.toLowerCase()) ||
                            item.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.status.toLowerCase().includes(searchTerm.toLowerCase())
                          );
                        })
                        .map((item, index) => {
                          const date = item.data ? moment(item.data).format("MMMM Do YYYY") : 'N/A';
                          return(
                            <tr key={item._id}>
                              <td className='py-4'>{index + 1}</td>
                              <td className='py-4'>{highlightText(item.instructorName, searchTerm)}</td>
                              <td className='py-4'>
                                <div className='text-black mb-2'>
                                  {item.speciality.map((speciality1, index) => (
                                    <React.Fragment key={index}>
                                      {highlightText(speciality1, searchTerm)}
                                      {index !== item.speciality.length - 1 && <br />}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </td>
                              <td className='py-4'>
                                <p className='text-gray-500 text-sm'>
                                  {highlightText(date, searchTerm)}
                                </p>
                              </td>
                              <td className='py-4'>{highlightText(item.status, searchTerm)}</td>
                              <td>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className='px-3 py-2 bg-red-500 rounded-full text-white font-bold'
                                >
                                  <MdDelete />
                                </button>
                              </td>
                            </tr>
                          )
                        })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='my-6 text-center'>
            <h1 className='text-4xl font-bold'>
              <span className='text-secondary'>Recommended Instructors</span> for you
            </h1>
          </div>
          <div>
            {hr.documents ? (
              <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {instructors
                    .filter((i) => {
                      const ex = hr.documents[0].existingMedicalCondition;
                      const surg = hr.documents[0].anySurgeries;
                      const aller = hr.documents[0].AnyAllergies;
                      if (ex === 'yes' || ex === 'Yes') {
                        if (i.specialities.includes('Medical Conditions')) {
                          return true;
                        }
                      }
                      if (surg === 'yes' || surg === 'Yes') {
                        if (i.specialities.includes('Allergy')) {
                          return true;
                        }
                      }
                      if (aller === 'yes' || aller === 'Yes') {
                        if (i.specialities.includes('Surgery')) {
                          return true;
                        }
                      }
                      if (userDiets.some(diet => i.specialities.includes(diet.dietName))) {
                        return true;
                      }
                      return false;
                    })
                    .map((i) => (
                      <div key={i._id} className='shadow-lg rounded-lg p-3 border border-secondary'>
                        <div className='p-4 flex flex-col h-full'>
                          <h2 className='text-xl font-semibold mb-2'>{highlightText(i.name, searchTerm)}</h2>
                          <div className='text-gray-600'>
                            <span className='text-black'>Specialities:<br/></span>{' '}
                            {i.specialities.map((speciality, index) => (
                              <React.Fragment key={index}>
                                {speciality}
                                {index !== i.specialities.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </div><br/>
                          <div className='mt-auto text-center'>
                            <Link to='/instructors'>
                              <button className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>
                                View Instructors
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div><br/>
                <div className='text-center text-lg text-black'>
                  To receive more personalized recommendations, please provide your health details.
                  <br />
                  <Link to='/dashboard/addHealthDetails' className='underline'>
                    Click Here to update Health Details
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className='text-center text-lg text-black'>
                  To receive personalized recommendations, please provide your health details.
                  <br />
                  <Link to='/dashboard/addHealthDetails' className='underline'>
                    Click Here to add Health Details
                  </Link>
                </div>
                <div className='mt-auto text-center'>
                  <Link to='/instructors'>
                    <button className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>
                      View All Instructors
                    </button>
                  </Link>
                </div>
              </div>
            )}
            <br/>

          </div>
          <br/>
          <br/>
        </div>
      </div>
    </div>
  );
};

export default MyInstructors;

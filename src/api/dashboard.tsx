import { axiosInstance } from '../utils/axiosInstance';
import { token } from '../utils/constant';

export const auditorDashboard = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const response = await axiosInstance.get('/dashboard', {
      headers: {
        Authorization: token,
      },
    });
    await setTimeout(() => {
      setLoading(false);
    }, 250);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const auditeeDashboard = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const response = await axiosInstance.get('/dashboard', {
      headers: {
        Authorization: token,
      },
    });
    await setTimeout(() => {
      setLoading(false);
    }, 250);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

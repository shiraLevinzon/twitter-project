import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Grid, List, Typography } from '@mui/material';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import UserDocument from '../../../../types/user.type';
import { orange } from '@mui/material/colors';
import { useUser } from '../../context/UserContext';
import { setUserProfile, sucssesUpdateFollowActions} from './Function';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { changeRole, updateFollow } from '../../services/UserServices';
import { getTweetsByOnwer } from '../../services/TweetServices';


const User: FC = () => {
  const location = useLocation();
  const { user, setUser } :{user: UserDocument, setUser: Dispatch<SetStateAction<UserDocument>>} = useUser();//
  const userProfile: UserDocument = location.state.user;
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [isMyOwnProfile, setIsMyOwnProfile] = useState<boolean>(false);
  const [numberOfPost, setNumberOfPost] = useState<number>();
  useEffect(() => {
    setUserProfile(userProfile, user, setRole, setIsMyOwnProfile, setIsFollow, mutationGetTweetsByOwner)
  }, [user]);

  const mutationUpdateFollow = useMutation({
    mutationFn: () => {
      return updateFollow(userProfile._id, isFollow);
    },
    onSuccess: async (data: Response) => {
      data.ok ? sucssesUpdateFollowActions(setIsFollow,isFollow,setUser,data) :
      toast.error(await data.text(), { position: 'top-right' }) 
      
    },
    onError: (error :Error) => {
      toast.error("error", { position: 'top-right' })
    },
  })
  const mutationGetTweetsByOwner = useMutation({
    mutationFn: () => {
      return getTweetsByOnwer(userProfile._id);
    },
    onSuccess: async (data: Response) => {
      data.ok ? setNumberOfPost((await data.json())?.length):
      toast.error(await data.text(), { position: 'top-right' }) 
    },
    onError: () => {
      toast.error("error", { position: 'top-right' })
    },
  })

  const mutationChangeRole = useMutation({
    mutationFn: () => {
      return changeRole(role);
    },
    onSuccess: async (data: Response) => {
      const futureRole: string = role === 'user' ? 'manager' : 'user';
      
      data.ok ? setRole(futureRole) :
      toast.error(await data.text(), { position: 'top-right' }) 
    },
    onError: () => {
      toast.error("error", { position: 'top-right' })
    },
  })


  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: orange[300], height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src={userProfile.image}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ borderRadius: 100, width: '150px', zIndex: '1' }} />
                  <Button variant={isFollow ? "outlined" : "contained"} color='warning'
                    onClick={()=>{mutationUpdateFollow.mutate()}} style={{ height: '36px', overflow: 'visible' }}>
                    {isFollow ? "UnFollow" : "Follow"}
                  </Button>
                  {isMyOwnProfile && <Button onClick={()=>{mutationChangeRole.mutate()}} variant="text"
                    color="warning" style={{ height: '36px', overflow: 'visible' }}>
                    Change Role
                  </Button>}
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{userProfile.userName}</MDBTypography>
                  <MDBCardText>New York</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">

                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{numberOfPost}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Tweets</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{userProfile.followers?.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1"><strong>Email: </strong>{userProfile.email}</MDBCardText>
                    <MDBCardText className="font-italic mb-1"><strong>Join In: </strong> {userProfile.dateCreated?.toString()}</MDBCardText>
                    <MDBCardText className="font-italic mb-0"><strong>Role: </strong>{role}</MDBCardText>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        
      </MDBContainer>
      <ToastContainer />
    </div>

  )
}

export { User }

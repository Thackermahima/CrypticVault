// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
 
// component
import Iconify from '../components/Iconify';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    // color: theme.palette.warning.darker,
    // backgroundColor: theme.palette.warning.lighter
  }));
  
  const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.warning.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
      theme.palette.warning.dark,
      0.24
    )} 100%)`
  }));
// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function SubscriptionRoot() { 
  return (
    <RootStyle>
              <IconWrapperStyle>
                <Iconify
                  icon="ic:outline-add-to-drive"
                  width={24}
                  height={24}
                />
              </IconWrapperStyle>
              <Typography variant="h4" color="#000">
               Drive
              </Typography>
            </RootStyle>
  );
}

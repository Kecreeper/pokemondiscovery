import {ProgressBar} from '@primer/react'

export default function StatBar({ num }) {
    let color;
    let color2;
    let percent = num;
    let percent2 = 100 - num;
  
    if (num >= 100) {
      percent = "100";
      percent2 = "0";
      color = "accent.emphasis";
      color2 = "accent.muted";
    } else if (num >= 75) {
      color = "success.emphasis";
      color2 = "success.muted";
    } else if (num >= 45) {
      color = "attention.emphasis";
      color2 = "attention.muted";
    } else {
      color = "danger.emphasis";
      color2 = "danger.muted";
    }
    
    return (
      <>
        <ProgressBar inline sx={{ width: "200px" }} aria-valuenow={num}>
          <ProgressBar.Item progress={percent} sx={{ backgroundColor: color }}/>
          <ProgressBar.Item progress={percent2} sx={{ backgroundColor: color2 }}/>
        </ProgressBar>
      </>
    )
  }
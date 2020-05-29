import * as React from 'react';

import GenerateTable from './GenerateTable';

const Summer: React.FunctionComponent = () => {
  return (
    <div>
      <h2>The 3 Mile Summer Course</h2>
      <img src="route.gif"/><br/>
      <i>Also available to view in Google Earth (if installed): <a href="data/summer.kmz">summer.kmz</a></i>
      <p>
      The course starts at the main gate: take a left and run along the main road for a short while,
      then take the first left.  Follow the road around to the right and look out for a footpath on the left.
      Follow this footpath over the Thames and across the lock (if a boat is going through you will have to cut
      across using the upstream lock gate).  Then turn left onto the towpath and follow it back to Wallingford.
      When you reach the main road, take a left and run over the bridge.  Take the first exit at the roundabout
      and run along the home-straight back to HR.  The finish is the side gate.
      </p>
      <br/>
      <b>Lock rules</b>
      <br/>
      The lock keeper normally tries to keep the lower gate closed when he sees us approaching, if you do have to
      use the upper gate then he is ok about it, but be prepared to stop if he says so.  If you have breath then do say thanks.
      You can stop your watch before doing the upper gate and re-start it when you reach the other side, this should allow for
      any occassions where you are delayed.  If you are near the back and there are boats waiting to go through the lock, and
      the lock keeper is waiting for us, then shout to him that you are the last one, or that there are x number of runners left to go.
      <p></p>
      <GenerateTable course="Summer"></GenerateTable>
    </div>
  );
};

export default Summer;


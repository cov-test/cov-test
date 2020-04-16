import { hot } from 'react-hot-loader';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { Header } from '../../components';
import Hint from '../../components/Hint';
import classify from './classif.js';

const Title = () => (
  <Typography component="p" variant="subtitle1" color="inherit">
    Hast Du Husten?
  </Typography>
);

const Hustenview = () => {
  const [allVals, setVals] = React.useState({
    'husten.hustentyp': 3,
    'husten.auswurf': 1,
    'husten.blut': 1,
  });
  const MyRadio = ({ options, id, question, info }) => {
    const renderedoptions = options.map((opt, idx) => <FormControlLabel value={idx} control={<Radio />} label={opt} />);
    const handleChange = (event) => {
      setVals({ ...allVals, [event.target.name]: parseInt(event.target.value, 10) });
    };
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{question}</FormLabel>
        {info != undefined ? <Hint text={info} /> : <span />}
        <RadioGroup name={id} value={allVals[id]} onChange={handleChange}>
          {renderedoptions}
        </RadioGroup>
      </FormControl>
    );
  };
  const recordAndClassif = async function () {
    let result = await classify();
    const map = [3, 0, 1]; //map the classify outputs to the radio options
    result = map[result];
    const av2 = allVals;
    av2['husten.hustentyp'] = result;
    //    alert(JSON.stringify(av2));
    setVals({ ...allVals, 'husten.hustentyp': result });
    setVals(av2); //it shouldn't be needed, but it is...
    //    alert(JSON.stringify(allVals));
  };
  return (
    <>
      <Header />
      <div className="home">
        <Title />
        <div id="label-container" />
        <MyRadio
          id="husten.hustentyp"
          question="Dein Husten ist eher..."
          options={['Trocken', 'Feucht', 'Ich weiss nicht', 'Kein Husten']}
        />
        <button id="recordingbtn" type="button" onClick={recordAndClassif}>
          Klassifiziere meinen Husten!
        </button>
        <MyRadio
          id="husten.auswurf"
          info="Auswurf sind die (manchmal gelben) ausgehusteten Absonderungen der Atemswegschleimhäute"
          question="Hast Du Auswurf?"
          options={['Ja', 'Nein']}
        />
        <MyRadio id="husten.blut" question="Hustet Du Blut?" options={['Ja', 'Nein']} />
      </div>
    </>
  );
};

export default hot(module)(Hustenview);

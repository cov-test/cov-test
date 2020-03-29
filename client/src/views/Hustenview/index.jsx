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

const MyRadio = ({ options, id, question, preselected, info }) => {
  const renderedoptions = options.map((opt, idx) => <FormControlLabel value={idx} control={<Radio />} label={opt} />);
  const [value, setValue] = React.useState(preselected);
  const handleChange = (event) => {
    setValue(parseInt(event.target.value));
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{question}</FormLabel>
      {info != undefined ? <Hint text={info} /> : <span />}
      <RadioGroup name={id} value={value} onChange={handleChange}>
        {renderedoptions}
      </RadioGroup>
    </FormControl>
  );
};

const recordAndClassif = async function () {
  alert(await classify());
};

const Hustenview = () => (
  <>
    <Header />
    <div className="home">
      <Title />
      <div id="label-container" />
      <MyRadio
        id="husten.hustentyp"
        question="Dein Husten ist eher..."
        options={['Trocken', 'Feucht', 'Ich weiss nicht', 'Kein Husten']}
        preselected={3}
      />
      <button id="recordingbtn" type="button" onClick={recordAndClassif}>
        Klassifiziere meinen Husten!
      </button>
      <MyRadio
        id="husten.auswurf"
        info="Auswurf sind die (manchmal gelben) ausgehusteten Absonderungen der Atemswegschleimhäute"
        question="Hast Du Auswurf?"
        options={['Ja', 'Nein']}
        preselected={1}
      />
      <MyRadio id="husten.blut" question="Hustet Du Blut?" options={['Ja', 'Nein']} preselected={1} />
    </div>
  </>
);

export default hot(module)(Hustenview);

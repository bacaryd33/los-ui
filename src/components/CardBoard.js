import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


class CardBoard extends React.Component {



    render(){
        const {name,attack,defense} = this.props
        return(
            <div>
            <Card>
                <CardActionArea>
                    <CardMedia
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Champion"
                    />
                    <CardContent>
                   <div>
                       {name}
                   </div>
                    <div>
                        {attack}
                    </div>
                    <div>
                        {defense}
                    </div>
                    </CardContent>
                </CardActionArea>
            </Card>
            </div>
        );
    }
}


export default CardBoard;

import * as React from "react";
import {connect} from "react-redux";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { setSaveSearchDialogOpen } from "./redux/actions";
import { save } from "./apiCalls";

const saveSearchDialog = (props) => { 
    const [searchName, setSearchName] = React.useState(props.text || "");
    
    const saveSearch = React.useCallback(() => {
        const errorCallback = (errorMessage) => console.info(errorMessage);
        save(props.searchResult, searchName, errorCallback);
        props.closeDialog();
    },
        [props.searchResult, searchName]
    );

    const footer = <div>
            <Button
                label="Save"              
                onClick={ev => saveSearch()}
            />
            <Button
                label="Cancel"
                onClick={props.closeDialog}
                className='p-button-secondary'
            />
        </div>;

    return (
        <div>
            <Dialog
                header="Save current search"
                width="200px"
                footer={footer}
                visible={props.open}
                onHide={props.closeDialog}
            >
                <InputText
                    label="Name"
                    value={searchName}
                    onChange={ev => setSearchName(ev.target.value)}
                />
            </Dialog>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        open: state.saveSearchDialogOpen,
        text: state.text,
        searchResult: state.searchResult,
    };
};

function dispatchToProps(dispatch) {
    return {
        closeDialog: () => dispatch(setSaveSearchDialogOpen(false))
    };
}

export default connect(mapStateToProps, dispatchToProps)(saveSearchDialog);
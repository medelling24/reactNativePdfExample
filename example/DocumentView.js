import React, { Component } from 'react';
import RNFS from 'react-native-fs';

import {
    Alert
} from 'react-native';

import { DocumentView, RNPdftron, Config } from '@pdftron/react-native-pdf';

type Props = {};
export default class DocumentViewExample extends Component<Props> {
    constructor(props) {
        super(props);
        const { path } = props.route.params;

        this.state = {
            path
        }
    }

    onLeadingNavButtonPressed = () => {
        if (this._viewer) {
            this._viewer.canUndo().then(canUndo => {
                // Error 1: iOS does not detect changes when draw with pencil
                if (canUndo) {
                    Alert.alert(
                        'Confirm changes',
                        'There are changes in this file. Do you want to save them?',
                        [
                            {text: ('Keep editing')},
                            {
                                text: ('Save changes'),
                                onPress: () => {
                                    debugger
                                    if(this.state.path.includes('.pdf')) {
                                        this._viewer.saveDocument()
                                    } else {
                                        this._viewer.exportAsImage(1, 160, Config.ExportFormat.JPEG, false)
                                            .then(imagePath => {
                                                // Error 2: iOS does not save the file correctly when export to jpeg
                                                const name = this.state.path.substring(this.state.path.lastIndexOf('/')+1);
                                                let destPath = RNFS.DocumentDirectoryPath + '/' + name
                                                RNFS.moveFile(imagePath, destPath).then(() => {
                                                    console.warn('saved')
                                                }).catch(e => {
                                                    console.warn(e)
                                                })
                                            })
                                    }
                                },
                            },
                        ],
                        {cancelable: true},
                    )
                }
            })
        }
    }



    render() {
        const path = this.state.path
        return (
            <DocumentView
                ref={(c) => this._viewer = c}
                document={path}
                readOnly={false}
                autoSaveEnabled={false}
                initialToolbar={Config.DefaultToolbars.Draw}
                showLeadingNavButton={true}
                saveStateEnabled={false}
                rememberLastUsedTool={false}
                documentSliderEnabled={false}
                hideToolbarsOnTap={false}
                fitMode={Config.FitMode.FitPage}
                pageIndicatorEnabled={false}
                layoutMode={Config.LayoutMode.Continuous}
                hideViewModeItems={[Config.ViewModePickerItem.ColorMode]}
                showQuickNavigationButton={false}
                onLeadingNavButtonPressed={this.onLeadingNavButtonPressed}
            />
        );
    }
}

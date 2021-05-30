using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
public class watchSelect : MonoBehaviour
{


    public GameObject watchModel1;
    public GameObject watchModel2;
    public GameObject watchModel3;
    public GameObject w1Window;
    public GameObject w2Window;
    public GameObject w3Window;
    public GameObject r1Window;
    public GameObject r2Window;
    public GameObject r3Window;
    public GameObject watch1;
    public GameObject watch2;
    public GameObject watch3;
    public GameObject ring1;
    public GameObject ring2;
    public GameObject ring3;
    public GameObject cat0;
    public GameObject cat1;
    public GameObject cat2;
    public GameObject cat3;
    public GameObject cat4;
    public GameObject backButton;


    Animation w1WindowAnimation;
    Animation w2WindowAnimation;
    Animation w3WindowAnimation;
    Animation w4WindowAnimation;
    Animation w5WindowAnimation;
    Animation w6WindowAnimation;
    Animation w7WindowAnimation;

    // Start is called before the first frame update
    void Start()
    {
        w1WindowAnimation = w1Window.GetComponent<Animation>();
        w2WindowAnimation = w2Window.GetComponent<Animation>();
        w3WindowAnimation = w3Window.GetComponent<Animation>();
        w4WindowAnimation = r1Window.GetComponent<Animation>();
        w5WindowAnimation = r2Window.GetComponent<Animation>();
        w6WindowAnimation = r3Window.GetComponent<Animation>();
        //w7WindowAnimation = watch1.GetComponent<Animation>();
    }

    // Update is called once per frame

    public void WatchOneButtonClicked()
    {
        watchModel1.SetActive(true);
        watchModel2.SetActive(false);
        watchModel3.SetActive(false);

        w1WindowAnimation["a1"].speed = 1;
        w1WindowAnimation.Play();


    }

    public void backButtonClicked()
    {
        watch1.SetActive(false);
        watch2.SetActive(false);
        watch3.SetActive(false);
        ring1.SetActive(false);
        ring2.SetActive(false);
        ring3.SetActive(false);
        cat0.SetActive(true);
        cat1.SetActive(true);
        cat2.SetActive(true);
        cat3.SetActive(true);
        cat4.SetActive(true);
        backButton.SetActive(false);


    }

    public void WatchTwoButtonClicked()
    {
        watchModel1.SetActive(false);
        watchModel2.SetActive(true);
        watchModel3.SetActive(false);

        w2WindowAnimation["a2"].speed = 1;
        w2WindowAnimation.Play();
    }


    public void watchCategory()
    {
        watch1.SetActive(true);
        watch2.SetActive(true);
        watch3.SetActive(true);
        cat0.SetActive(false);
        cat1.SetActive(false);
        cat2.SetActive(false);
        cat3.SetActive(false);
        cat4.SetActive(false);


    }


    public void ringCategory()
    {
        ring1.SetActive(true);
        ring2.SetActive(true);
        ring3.SetActive(true);
        cat0.SetActive(false);
        cat1.SetActive(false);
        cat2.SetActive(false);
        cat3.SetActive(false);
        cat4.SetActive(false);


    }

    public void WatchThreeButtonClicked()
    {
        watchModel1.SetActive(false);
        watchModel2.SetActive(false);
        watchModel3.SetActive(true);

        w3WindowAnimation["a3"].speed = 1;
        w3WindowAnimation.Play();
    }


    public void ring1ButtonClicked()
    {
        w4WindowAnimation["r1"].speed = 1;
        w4WindowAnimation.Play();
    }

    public void ring2ButtonClicked()
    {
        w5WindowAnimation["r2"].speed = 1;
        w5WindowAnimation.Play();
    }

    public void ring3ButtonClicked()
    {
        w6WindowAnimation["r3"].speed = 1;
        w6WindowAnimation.Play();
    }
    public void CloseButtonClicked()
    {
        string buttonName = EventSystem.current.currentSelectedGameObject.name;

        if(buttonName == "w1close")
        {
            //play the animation
            w1WindowAnimation["a1"].speed = -1;
            w1WindowAnimation["a1"].time = w1WindowAnimation["a1"].length;
            w1WindowAnimation.Play();
        }

      else if (buttonName == "w2close")
        {
            //play the animation
            w2WindowAnimation["a2"].speed = -1;
            w2WindowAnimation["a2"].time = w2WindowAnimation["a2"].length;
            w2WindowAnimation.Play();
        }

        else if (buttonName == "w3close")
        {
            //play the animation

            w3WindowAnimation["a3"].speed = -1;
            w3WindowAnimation["a3"].time = w3WindowAnimation["a3"].length;
            w3WindowAnimation.Play();
        }

        else if (buttonName == "r1close")
        {
            //play the animation

            w4WindowAnimation["r1"].speed = -1;
            w4WindowAnimation["r1"].time = w4WindowAnimation["r1"].length;
            w4WindowAnimation.Play();
        }

        else if (buttonName == "r2close")
        {
            //play the animation

            w5WindowAnimation["r2"].speed = -1;
            w5WindowAnimation["r2"].time = w5WindowAnimation["r2"].length;
            w5WindowAnimation.Play();
        }

        else if (buttonName == "r3close")
        {
            //play the animation

            w6WindowAnimation["r3"].speed = -1;
            w6WindowAnimation["r3"].time = w6WindowAnimation["r3"].length;
            w6WindowAnimation.Play();
        }
    }    
}

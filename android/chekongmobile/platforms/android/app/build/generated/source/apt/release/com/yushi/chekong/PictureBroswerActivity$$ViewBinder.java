// Generated code from Butter Knife. Do not modify!
package com.yushi.chekong;

import android.view.View;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Finder;
import butterknife.internal.ViewBinder;
import java.lang.IllegalStateException;
import java.lang.Object;
import java.lang.Override;

public class PictureBroswerActivity$$ViewBinder<T extends PictureBroswerActivity> implements ViewBinder<T> {
  @Override
  public Unbinder bind(final Finder finder, final T target, Object source) {
    InnerUnbinder unbinder = createUnbinder(target);
    View view;
    view = finder.findRequiredView(source, 2131165217, "field 'backId' and method 'onViewClicked'");
    target.backId = finder.castView(view, 2131165217, "field 'backId'");
    unbinder.view2131165217 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = finder.findRequiredView(source, 2131165239, "field 'commitId' and method 'onViewClicked'");
    target.commitId = finder.castView(view, 2131165239, "field 'commitId'");
    unbinder.view2131165239 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = finder.findRequiredView(source, 2131165272, "field 'imageId'");
    target.imageId = finder.castView(view, 2131165272, "field 'imageId'");
    return unbinder;
  }

  protected InnerUnbinder<T> createUnbinder(T target) {
    return new InnerUnbinder(target);
  }

  protected static class InnerUnbinder<T extends PictureBroswerActivity> implements Unbinder {
    private T target;

    View view2131165217;

    View view2131165239;

    protected InnerUnbinder(T target) {
      this.target = target;
    }

    @Override
    public final void unbind() {
      if (target == null) throw new IllegalStateException("Bindings already cleared.");
      unbind(target);
      target = null;
    }

    protected void unbind(T target) {
      view2131165217.setOnClickListener(null);
      target.backId = null;
      view2131165239.setOnClickListener(null);
      target.commitId = null;
      target.imageId = null;
    }
  }
}
